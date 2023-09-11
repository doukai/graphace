<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import RolePermissionSelectConnectionTable from '~/lib/components/objects/role-permission/RolePermissionSelectConnectionTable.svelte';
	import type { RolePermission, QueryTypeRolePermissionConnectionArgs, MutationTypeRolePermissionArgs } from '~/lib/types/schema';
	import { Query_rolePermissionConnectionStore, Mutation_rolePermissionStore, Mutation_role_rolePermissionStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.rolePermission.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_rolePermissionConnection = data.Query_rolePermissionConnection as Query_rolePermissionConnectionStore;
	$: nodes = $Query_rolePermissionConnection.data?.rolePermissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_rolePermissionConnection.data?.rolePermissionConnection?.totalCount || 0;
	const Mutation_rolePermission = new Mutation_rolePermissionStore();
	const Mutation_role_rolePermission = new Mutation_role_rolePermissionStore();
	let errors: Record<number, Errors> = {};

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
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
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
		validateMutation('Role', { id: id, rolePermission: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_rolePermission.mutate({
						role_id: id,
						role_rolePermission: event.detail.selected,
						update: true,
						mergeToList: ['rolePermission']
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
				errors = validErrors.rolePermission.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
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
