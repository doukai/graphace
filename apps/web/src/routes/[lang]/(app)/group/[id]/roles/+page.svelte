<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleConnectionTable from '~/lib/components/objects/role/RoleConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationRoleArgs, QueryRoleConnectionArgs, Role } from '~/lib/types/schema';
	import { Query_group_rolesStore, Mutation_roleStore, Mutation_group_rolesStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.fields.roles.name());
	$: id = data.id as string;
	$: Query_group_roles = data.Query_group_roles as Query_group_rolesStore;
	$: group = $Query_group_roles.data?.group;
	$: nodes = $Query_group_roles.data?.group?.rolesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_group_roles.data?.group?.rolesConnection?.totalCount || 0;
	const Mutation_role = new Mutation_roleStore();
	const Mutation_group_roles = new Mutation_group_rolesStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryRoleConnectionArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_group_roles.fetch({
			variables: { group_id: { val: group?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.group?.rolesConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationRoleArgs;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validateMutation('Role', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_role.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.role);
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
			args: MutationRoleArgs[];
			then: (data: Role[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Group', { id: id, roles: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				Mutation_group_roles.mutate({
					group_id: id,
					group_roles: event.detail.args,
					mergeToList: ['roles']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
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
<RoleConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_group_roles.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
