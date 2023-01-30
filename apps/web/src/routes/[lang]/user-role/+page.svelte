<script lang="ts">
	import UserRoleTable from '~/lib/components/objects/user-role/UserRoleTable.svelte';
	import type { UserRole, UserRoleListArgs, MutationTypeUserRoleArgs } from '~/lib/types/schema';
	import { Query_userRoleListStore, Mutation_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userRoleList = data.Query_userRoleList as Query_userRoleListStore;
	const Mutation_userRole = new Mutation_userRoleStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserRoleListArgs;
			then: (data: (UserRole | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userRoleList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userRoleList;
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			update?: boolean;
			then: (data: UserRole | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userRole.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userRole);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>
<UserRoleTable
	nodes={$Query_userRoleList.data?.userRole}
	isFetching={$Query_userRoleList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
