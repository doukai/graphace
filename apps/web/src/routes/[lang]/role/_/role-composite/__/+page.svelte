<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import RoleCompositeSelectConnectionTable from '~/lib/components/objects/role-composite/RoleCompositeSelectConnectionTable.svelte';
	import type { RoleComposite, QueryTypeRoleCompositeConnectionArgs, MutationTypeRoleCompositeArgs } from '~/lib/types/schema';
	import { Query_roleCompositeConnectionStore, Mutation_roleCompositeStore } from '$houdini';
	import { updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, 'roleComposite', PageType.SELECT);
	$: originalNodes = data.nodes as (MutationTypeRoleCompositeArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: Query_roleCompositeConnection = data.Query_roleCompositeConnection as Query_roleCompositeConnectionStore;
	$: nodes = $Query_roleCompositeConnection.data?.roleCompositeConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleCompositeConnection.data?.roleCompositeConnection?.totalCount || 0;
	const Mutation_roleComposite = new Mutation_roleCompositeStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleCompositeConnectionArgs;
			then: (data: (RoleComposite | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_roleCompositeConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleCompositeConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleCompositeArgs;
			update?: boolean;
			then: (data: RoleComposite | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('RoleComposite', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_roleComposite.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleComposite);
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
			selected: MutationTypeRoleCompositeArgs | null | undefined | (MutationTypeRoleCompositeArgs | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		if (Array.isArray(event.detail.selected)) {
			ot({
				node: updateNodeParam($page.url, [...originalNodes, ...event.detail.selected.filter((item) => !originalNodes.map((node) => node?.id).includes(item?.id))]),
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
<RoleCompositeSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_roleCompositeConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
