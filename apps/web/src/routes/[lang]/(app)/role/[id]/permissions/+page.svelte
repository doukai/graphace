<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import PermissionConnectionTable from '~/lib/components/objects/permission/PermissionConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypePermissionArgs, QueryTypePermissionConnectionArgs, Permission } from '~/lib/types/schema';
	import { Query_role_permissionsStore, Mutation_permissionStore, Mutation_role_permissionsStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name());
	$: id = data.id as string;
	$: Query_role_permissions = data.Query_role_permissions as Query_role_permissionsStore;
	$: role = $Query_role_permissions.data?.role;
	$: nodes = $Query_role_permissions.data?.role?.permissionsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_role_permissions.data?.role?.permissionsConnection?.totalCount || 0;
	const Mutation_permission = new Mutation_permissionStore();
	const Mutation_role_permissions = new Mutation_role_permissionsStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypePermissionConnectionArgs;
			then: (data: (Permission | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_role_permissions.fetch({
			variables: { role_id: { val: role?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.role?.permissionsConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypePermissionArgs;
			update?: boolean;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Permission', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_permission.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.permission);
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypePermissionArgs[];
			update?: boolean;
			then: (data: Permission[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', { permissions: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_permissions.mutate({
					role_id: id,
					role_permissions: event.detail.args,
					update: true,
					mergeToList: ['permissions']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.permissions.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../permission/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./permissions/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../permission/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./permissions/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<PermissionConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_role_permissions.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
