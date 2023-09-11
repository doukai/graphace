<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RolePermissionConnectionTable from '~/lib/components/objects/role-permission/RolePermissionConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationTypeRolePermissionArgs, QueryTypeRolePermissionConnectionArgs, RolePermission } from '~/lib/types/schema';
	import { Query_permission_rolePermissionStore, Mutation_rolePermissionStore, Mutation_permission_rolePermissionStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.fields.rolePermission.name());
	$: name = data.name as string;
	$: Query_permission_rolePermission = data.Query_permission_rolePermission as Query_permission_rolePermissionStore;
	$: permission = $Query_permission_rolePermission.data?.permission;
	$: nodes = $Query_permission_rolePermission.data?.permission?.rolePermissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_permission_rolePermission.data?.permission?.rolePermissionConnection?.totalCount || 0;
	const Mutation_rolePermission = new Mutation_rolePermissionStore();
	const Mutation_permission_rolePermission = new Mutation_permission_rolePermissionStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRolePermissionConnectionArgs;
			then: (data: (RolePermission | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_permission_rolePermission.fetch({
			variables: { permission_name: { val: permission?.name }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.permission?.rolePermissionConnection?.edges?.map((edge) => edge?.node));
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeRolePermissionArgs[];
			update?: boolean;
			then: (data: RolePermission[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Permission', { name: name, rolePermission: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_permission_rolePermission.mutate({
					permission_name: name,
					permission_rolePermission: event.detail.args,
					update: true,
					mergeToList: ['rolePermission']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.rolePermission.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../role-permission/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./role-permission/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role-permission/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./role-permission/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<RolePermissionConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_permission_rolePermission.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
