<script lang="ts">
	import QueryTypeTable from '~/lib/components/objects/query-type/QueryTypeTable.svelte';
	import type { QueryType, QueryTypeQueryTypeListArgs, MutationTypeQueryTypeArgs } from '~/lib/types/schema';
	import { QueryQueryTypeConnectionStore, GQL_MutationQueryType } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryQueryTypeConnection = data.QueryQueryTypeConnection as QueryQueryTypeConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeQueryTypeListArgs;
			then: (data: (QueryType | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryQueryTypeConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.queryTypeConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeQueryTypeArgs;
			then: (data: QueryType | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationQueryType.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.queryType);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<QueryTypeTable
	nodes={$QueryQueryTypeConnection.data?.queryTypeConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryQueryTypeConnection.data?.queryTypeConnection?.totalCount || 0}
	isFetching={$QueryQueryTypeConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
