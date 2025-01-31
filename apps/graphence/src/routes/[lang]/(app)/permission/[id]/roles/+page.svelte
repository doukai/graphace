<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import RoleConnectionTable from '~/lib/components/objects/role/RoleConnectionTable.svelte';
	import type { Query_permission_roles_Store } from '~/lib/stores/query/query_permission_roles_store';
	import type { Mutation_permission_roles_Store } from '~/lib/stores/mutation/mutation_permission_roles_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import type { RoleInput, MutationRoleArgs, QueryRoleConnectionArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.fields.roles.name());
	$: name = data.name as string;
	$: query_permission_roles_Store = data.query_permission_roles_Store as Query_permission_roles_Store;
	$: permission = $query_permission_roles_Store.response.data?.permission;
	$: nodes = $query_permission_roles_Store.response.data?.permission?.rolesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_permission_roles_Store.response.data?.permission?.rolesConnection?.totalCount || 0;
	$: mutation_permission_roles_Store = data.mutation_permission_roles_Store as Mutation_permission_roles_Store;
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryRoleConnectionArgs;
			then: (data: (RoleInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_permission_roles_Store.fetch({ permission_name: { val: permission?.name }, ...event.detail.args })
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.permission?.rolesConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationRoleArgs;
			then: (data: RoleInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validate('Mutation_role_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_role_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.role);
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
			args: MutationRoleArgs[];
			then: (data: RoleInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_permission_Arguments', { where: { name: { val: name }}, roles: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_permission_roles_Store.fetch({
					permission_name: name,
					permission_roles: event.detail.args
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
				errors = validErrors.roles.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../role/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./roles/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./roles/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>

<Card>
	<RoleConnectionTable
		showSaveButton={false}
		showRemoveButton={false}
		showUnbindButton={true}
		showGotoSelectButton={true}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$query_permission_roles_Store.isFetching}
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
