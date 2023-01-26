<script lang="ts">
	import UserRoleTable from '~/lib/components/objects/user-role/UserRoleTable.svelte';
	import type { UserRole, QueryTypeUserRoleListArgs, MutationTypeUserRoleArgs } from '~/lib/types/schema';
	import { Query_userRoleConnectionStore, Mutation_userRole_updateStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userRoleConnection = data.Query_userRoleConnection as Query_userRoleConnectionStore;
	const Mutation_userRole_update = new Mutation_userRole_updateStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserRoleListArgs;
			then: (data: (UserRole | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userRoleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userRoleConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			then: (data: UserRole | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userRole_update.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userRole);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserRoleTable
	nodes={$Query_userRoleConnection.data?.userRoleConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userRoleConnection.data?.userRoleConnection?.totalCount || 0}
	isFetching={$Query_userRoleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
