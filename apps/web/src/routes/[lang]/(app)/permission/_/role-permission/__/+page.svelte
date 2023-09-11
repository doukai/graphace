<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import RolePermissionSelectConnectionTable from '~/lib/components/objects/role-permission/RolePermissionSelectConnectionTable.svelte';
	import type { RolePermission, QueryTypeRolePermissionConnectionArgs, MutationTypeRolePermissionArgs } from '~/lib/types/schema';
	import { Query_rolePermissionConnectionStore, Mutation_rolePermissionStore } from '$houdini';
	import { updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.fields.rolePermission.name(), PageType.SELECT);
	$: originalNodes = data.nodes as (MutationTypeRolePermissionArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: Query_rolePermissionConnection = data.Query_rolePermissionConnection as Query_rolePermissionConnectionStore;
	$: nodes = $Query_rolePermissionConnection.data?.rolePermissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_rolePermissionConnection.data?.rolePermissionConnection?.totalCount || 0;
	const Mutation_rolePermission = new Mutation_rolePermissionStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRolePermissionConnectionArgs;
			then: (data: (RolePermission | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_rolePermissionConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.rolePermissionConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRolePermissionArgs;
			update?: boolean;
			then: (data: RolePermission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.name)?.indexOf(event.detail.args.name);
		validateMutation('RolePermission', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_rolePermission.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.rolePermission);
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
			selected: MutationTypeRolePermissionArgs | null | undefined | (MutationTypeRolePermissionArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		if (Array.isArray(event.detail.selected)) {
			ot({
				node: updateNodeParam($page.url, [...originalNodes, ...event.detail.selected.filter((item) => !originalNodes.map((node) => node?.name).includes(item?.name))]),
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
<RolePermissionSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_rolePermissionConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
