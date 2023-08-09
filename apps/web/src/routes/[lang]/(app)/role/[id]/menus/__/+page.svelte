<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import MenuSelectConnectionTable from '~/lib/components/objects/menu/MenuSelectConnectionTable.svelte';
	import type { Menu, QueryTypeMenuConnectionArgs, MutationTypeMenuArgs } from '~/lib/types/schema';
	import { Query_menuConnectionStore, Mutation_menuStore, Mutation_role_menusStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.menus.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_menuConnection = data.Query_menuConnection as Query_menuConnectionStore;
	$: nodes = $Query_menuConnection.data?.menuConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_menuConnection.data?.menuConnection?.totalCount || 0;
	const Mutation_menu = new Mutation_menuStore();
	const Mutation_role_menus = new Mutation_role_menusStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeMenuConnectionArgs;
			then: (data: (Menu | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_menuConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.menuConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeMenuArgs;
			update?: boolean;
			then: (data: Menu | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
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
						if (result.errors) {
							event.detail.catch(result.errors);
						}
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
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Role', { menus: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_menus.mutate({
						role_id: id,
						role_menus: event.detail.selected,
						update: true,
						mergeToList: ['menus']
					})
						.then((result) => {
							event.detail.then();
							if (result.errors) {
								event.detail.catch(result.errors);
							}
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.menus.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<MenuSelectConnectionTable
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
