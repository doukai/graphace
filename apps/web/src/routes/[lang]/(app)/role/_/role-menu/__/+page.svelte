<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import RoleMenuSelectConnectionTable from '~/lib/components/objects/role-menu/RoleMenuSelectConnectionTable.svelte';
	import type { RoleMenu, QueryTypeRoleMenuConnectionArgs, MutationTypeRoleMenuArgs } from '~/lib/types/schema';
	import { Query_roleMenuConnectionStore, Mutation_roleMenuStore } from '$houdini';
	import { updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleMenu.name(), PageType.SELECT);
	$: originalNodes = data.nodes as (MutationTypeRoleMenuArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: Query_roleMenuConnection = data.Query_roleMenuConnection as Query_roleMenuConnectionStore;
	$: nodes = $Query_roleMenuConnection.data?.roleMenuConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleMenuConnection.data?.roleMenuConnection?.totalCount || 0;
	const Mutation_roleMenu = new Mutation_roleMenuStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleMenuConnectionArgs;
			then: (data: (RoleMenu | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_roleMenuConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleMenuConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleMenuArgs;
			update?: boolean;
			then: (data: RoleMenu | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('RoleMenu', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_roleMenu.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleMenu);
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
			selected: MutationTypeRoleMenuArgs | null | undefined | (MutationTypeRoleMenuArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
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
<RoleMenuSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_roleMenuConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
