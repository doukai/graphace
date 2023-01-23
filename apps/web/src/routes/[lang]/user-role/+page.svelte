<script lang="ts">
	import UserRoleTable from '~/lib/components/objects/user-role/UserRoleTable.svelte';
	import type { UserRole, QueryTypeUserRoleListArgs, MutationTypeUserRoleArgs } from '~/lib/types/schema';
	import { QueryUserRoleConnectionStore, GQL_MutationUserRole } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryUserRoleConnection = data.QueryUserRoleConnection as QueryUserRoleConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserRoleListArgs;
			then: (data: (UserRole | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryUserRoleConnection.fetch({ variables: event.detail.args })
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
		GQL_MutationUserRole.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userRole);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserRoleTable
	nodes={$QueryUserRoleConnection.data?.userRoleConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryUserRoleConnection.data?.userRoleConnection?.totalCount || 0}
	isFetching={$QueryUserRoleConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
