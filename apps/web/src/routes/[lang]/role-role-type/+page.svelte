<script lang="ts">
	import RoleRoleTypeTable from '~/lib/components/objects/role-role-type/RoleRoleTypeTable.svelte';
	import type { RoleRoleType, QueryTypeRoleRoleTypeListArgs, MutationTypeRoleRoleTypeArgs } from '~/lib/types/schema';
	import { Query_roleRoleTypeConnectionStore, Mutation_roleRoleType_updateStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_roleRoleTypeConnection = data.Query_roleRoleTypeConnection as Query_roleRoleTypeConnectionStore;
	const Mutation_roleRoleType_update = new Mutation_roleRoleType_updateStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleRoleTypeListArgs;
			then: (data: (RoleRoleType | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_roleRoleTypeConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleRoleTypeConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleRoleTypeArgs;
			then: (data: RoleRoleType | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_roleRoleType_update.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.roleRoleType);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<RoleRoleTypeTable
	nodes={$Query_roleRoleTypeConnection.data?.roleRoleTypeConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_roleRoleTypeConnection.data?.roleRoleTypeConnection?.totalCount || 0}
	isFetching={$Query_roleRoleTypeConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
