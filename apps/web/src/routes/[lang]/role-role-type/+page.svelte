<script lang="ts">
	import RoleRoleTypeTable from '~/lib/components/objects/role-role-type/RoleRoleTypeTable.svelte';
	import type { RoleRoleType, QueryTypeRoleRoleTypeListArgs, MutationTypeRoleRoleTypeArgs } from '~/lib/types/schema';
	import { QueryRoleRoleTypeConnectionStore, GQL_MutationRoleRoleType } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryRoleRoleTypeConnection = data.QueryRoleRoleTypeConnection as QueryRoleRoleTypeConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleRoleTypeListArgs;
			then: (data: (RoleRoleType | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryRoleRoleTypeConnection.fetch({ variables: event.detail.args })
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
		GQL_MutationRoleRoleType.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.roleRoleType);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<RoleRoleTypeTable
	nodes={$QueryRoleRoleTypeConnection.data?.roleRoleTypeConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryRoleRoleTypeConnection.data?.roleRoleTypeConnection?.totalCount || 0}
	isFetching={$QueryRoleRoleTypeConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
