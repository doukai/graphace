<script lang="ts">
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import type { Role, QueryTypeRoleListArgs, MutationTypeRoleArgs } from '~/lib/types/schema';
	import { QueryRoleConnectionStore, GQL_MutationRole } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryRoleConnection = data.QueryRoleConnection as QueryRoleConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleListArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryRoleConnection.fetch({ variables: event.detail.args })
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
			then: (data: Role | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationRole.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.role);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<RoleTable
	nodes={$QueryRoleConnection.data?.roleConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryRoleConnection.data?.roleConnection?.totalCount || 0}
	isFetching={$QueryRoleConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
