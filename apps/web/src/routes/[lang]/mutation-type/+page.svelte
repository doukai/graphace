<script lang="ts">
	import MutationTypeTable from '~/lib/components/objects/mutation-type/MutationTypeTable.svelte';
	import type { MutationType, QueryTypeMutationTypeListArgs, MutationTypeMutationTypeArgs } from '~/lib/types/schema';
	import { QueryMutationTypeConnectionStore, GQL_MutationMutationType } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryMutationTypeConnection = data.QueryMutationTypeConnection as QueryMutationTypeConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeMutationTypeListArgs;
			then: (data: (MutationType | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryMutationTypeConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.mutationTypeConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeMutationTypeArgs;
			then: (data: MutationType | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationMutationType.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.mutationType);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<MutationTypeTable
	nodes={$QueryMutationTypeConnection.data?.mutationTypeConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryMutationTypeConnection.data?.mutationTypeConnection?.totalCount || 0}
	isFetching={$QueryMutationTypeConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
