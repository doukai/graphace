<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import MenuSelectConnectionTable from '~/lib/components/objects/menu/MenuSelectConnectionTable.svelte';
	import type { Menu, QueryTypeMenuConnectionArgs, MutationTypeMenuArgs } from '~/lib/types/schema';
	import { Query_menuConnectionStore, Mutation_menuStore } from '$houdini';
	import { updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Menu.fields.folder.name(), PageType.SELECT);
	$: errors = data.errors as Record<number, Errors>;
	$: Query_menuConnection = data.Query_menuConnection as Query_menuConnectionStore;
	$: nodes = $Query_menuConnection.data?.menuConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_menuConnection.data?.menuConnection?.totalCount || 0;
	const Mutation_menu = new Mutation_menuStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeMenuConnectionArgs;
			then: (data: (Menu | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_menuConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.menuConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeMenuArgs;
			update?: boolean;
			then: (data: Menu | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Menu', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_menu.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.menu);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const select = (
		event: CustomEvent<{
			selected: MutationTypeMenuArgs | null | undefined | (MutationTypeMenuArgs | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		if (!Array.isArray(event.detail.selected)) {
			ot({
				node: updateNodeParam($page.url, event.detail.selected),
				errors: updateErrorsParam($page.url, errors)
			});
		}
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};
</script>
<MenuSelectConnectionTable
	multipleSelect={false}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_menuConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
