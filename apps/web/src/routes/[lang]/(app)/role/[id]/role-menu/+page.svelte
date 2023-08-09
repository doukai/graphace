<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleMenuConnectionTable from '~/lib/components/objects/role-menu/RoleMenuConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationTypeRoleMenuArgs, QueryTypeRoleMenuConnectionArgs, RoleMenu } from '~/lib/types/schema';
	import { Query_role_roleMenuStore, Mutation_roleMenuStore, Mutation_role_roleMenuStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleMenu.name());
	$: id = data.id as string;
	$: Query_role_roleMenu = data.Query_role_roleMenu as Query_role_roleMenuStore;
	$: role = $Query_role_roleMenu.data?.role;
	$: nodes = $Query_role_roleMenu.data?.role?.roleMenuConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_role_roleMenu.data?.role?.roleMenuConnection?.totalCount || 0;
	const Mutation_roleMenu = new Mutation_roleMenuStore();
	const Mutation_role_roleMenu = new Mutation_role_roleMenuStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleMenuConnectionArgs;
			then: (data: (RoleMenu | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_role_roleMenu.fetch({
			variables: { role_id: { val: role?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.role?.roleMenuConnection?.edges?.map((edge) => edge?.node));
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeRoleMenuArgs[];
			update?: boolean;
			then: (data: RoleMenu[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Role', { roleMenu: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_roleMenu.mutate({
					role_id: id,
					role_roleMenu: event.detail.args,
					update: true,
					mergeToList: ['roleMenu']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.roleMenu.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../role-menu/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./role-menu/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role-menu/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./role-menu/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<RoleMenuConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_role_roleMenu.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
