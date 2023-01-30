<script lang="ts">
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import type { Role, RoleListArgs, MutationTypeRoleArgs } from '~/lib/types/schema';
	import { Query_roleListStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_roleList = data.Query_roleList as Query_roleListStore;
	const Mutation_role = new Mutation_roleStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleListArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_roleList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleList;
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
	nodes={$Query_roleList.data?.role}
	isFetching={$Query_roleList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
