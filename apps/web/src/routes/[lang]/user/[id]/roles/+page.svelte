<script lang="ts">
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_user_rolesStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeRoleArgs, QueryTypeUserConnectionArgs, Role } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_user_roles = data.Query_user_roles as Query_user_rolesStore;
	$: user = $Query_user_roles.data?.user;
	const Mutation_role = new Mutation_roleStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserConnectionArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_user_roles.fetch({
			variables: { user_id: { val: user?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.user?.rolesConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
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

<RoleTable
	nodes={$Query_user_roles.data?.user?.rolesConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_user_roles.data?.user?.rolesConnection?.totalCount || 0}
	isFetching={$Query_user_roles.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
