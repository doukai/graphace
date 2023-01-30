<script lang="ts">
	import RoleRoleTypeTable from '~/lib/components/objects/role-role-type/RoleRoleTypeTable.svelte';
	import type { RoleRoleType, RoleRoleTypeListArgs, MutationTypeRoleRoleTypeArgs } from '~/lib/types/schema';
	import { Query_roleRoleTypeListStore, Mutation_roleRoleTypeStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_roleRoleTypeList = data.Query_roleRoleTypeList as Query_roleRoleTypeListStore;
	const Mutation_roleRoleType = new Mutation_roleRoleTypeStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleRoleTypeListArgs;
			then: (data: (RoleRoleType | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_roleRoleTypeList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleRoleTypeList;
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleRoleTypeArgs;
			update?: boolean;
			then: (data: RoleRoleType | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_roleRoleType.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.roleRoleType);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>
<RoleRoleTypeTable
	nodes={$Query_roleRoleTypeList.data?.roleRoleType}
	isFetching={$Query_roleRoleTypeList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
