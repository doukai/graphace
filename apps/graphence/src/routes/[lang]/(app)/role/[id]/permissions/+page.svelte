<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import PermissionConnectionTable from '~/lib/components/objects/permission/PermissionConnectionTable.svelte';
	import type { Query_role_permissions_Store } from '~/lib/stores/query/query_role_permissions_store';
	import type { Mutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import type { PermissionInput, MutationPermissionArgs, QueryPermissionConnectionArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name());
	$: id = data.id as string;
	$: query_role_permissions_Store = data.query_role_permissions_Store as Query_role_permissions_Store;
	$: role = $query_role_permissions_Store.response.data?.role;
	$: nodes = $query_role_permissions_Store.response.data?.role?.permissionsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_permissions_Store.response.data?.role?.permissionsConnection?.totalCount || 0;
	$: mutation_role_permissions_Store = data.mutation_role_permissions_Store as Mutation_role_permissions_Store;
	$: mutation_permission_Store = data.mutation_permission_Store as Mutation_permission_Store;
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryPermissionConnectionArgs;
			then: (data: (PermissionInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_role_permissions_Store.fetch({ role_id: { val: role?.id }, ...event.detail.args })
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.role?.permissionsConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs;
			then: (data: PermissionInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.name)?.indexOf(event.detail.args.name || event.detail.args.where?.name?.val || undefined);
		validate('Mutation_permission_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_permission_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.permission);
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
			args: MutationPermissionArgs[];
			then: (data: PermissionInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id }}, permissions: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_role_permissions_Store.fetch({
					role_id: id,
					role_permissions: event.detail.args
				})
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(undefined);
						}
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

<Card>
	<PermissionConnectionTable
		showSaveButton={false}
		showRemoveButton={false}
		showUnbindButton={true}
		showGotoSelectButton={true}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$query_role_permissions_Store.isFetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:parentMutation={parentMutation}
		on:edit={edit}
		on:create={create}
		on:gotoField={gotoField}
		on:gotoSelect={gotoSelect}
		on:back={back}
	/>
</Card>
