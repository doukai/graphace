<script lang="ts">
	import { Collapse } from '@graphace/ui/components';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_user_rolesStore, Mutation_user_rolesStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type {
		MutationTypeRoleArgs,
		MutationTypeUserArgs,
		QueryTypeRoleListArgs,
		Role,
		User
	} from '~/lib/types/schema';

	export let data: PageData;
	$: Query_user_roles = data.Query_user_roles as Query_user_rolesStore;
	$: user = $Query_user_roles.data?.user;
	const Mutation_user_roles = new Mutation_user_rolesStore();
	const Mutation_role = new Mutation_roleStore();
	let openTop: boolean = false;
	let openBottom: boolean = true;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_user_roles.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.user);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const fetchRoles = (
		event: CustomEvent<{
			args: QueryTypeRoleListArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_user_roles.fetch({ variables: { id: { val: user?.id }, roles: event.detail.args } })
			.then((result) => {
				event.detail.then(result.data?.user?.rolesConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutationRoles = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_role.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.role);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<Collapse index={0} title={openTop ? '' : 'User'} bind:open={openTop}>
	<UserForm
		node={$Query_user_roles.data?.user}
		isFetching={$Query_user_roles.fetching}
		on:mutation={mutation}
	/>
</Collapse>
<div class="divider" />
<Collapse index={1} title={openBottom ? '' : 'Role'} bind:open={openBottom}>
	<RoleTable
		nodes={$Query_user_roles.data?.user?.rolesConnection?.edges?.map((edge) => edge?.node)}
		totalCount={$Query_user_roles.data?.user?.rolesConnection?.totalCount || 0}
		isFetching={$Query_user_roles.fetching}
		on:fetch={fetchRoles}
		on:mutation={mutationRoles}
	/>
</Collapse>
