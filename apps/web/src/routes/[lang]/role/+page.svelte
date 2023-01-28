<script lang="ts">
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import type { Role, QueryTypeRoleListArgs, MutationTypeRoleArgs } from '~/lib/types/schema';
	import { Query_roleConnectionStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_roleConnection = data.Query_roleConnection as Query_roleConnectionStore;
	const Mutation_role = new Mutation_roleStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleListArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_roleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleConnection?.edges?.map((edge) => edge?.node));
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
	nodes={$Query_roleConnection.data?.roleConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_roleConnection.data?.roleConnection?.totalCount || 0}
	isFetching={$Query_roleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
