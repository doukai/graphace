<script lang="ts">
	import QueryTypeForm from '~/lib/components/objects/query-type/QueryTypeForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryQueryTypeStore } from '$houdini';
	import { GQL_MutationQueryType } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeQueryTypeArgs, QueryType } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryQueryType = data.QueryQueryType as QueryQueryTypeStore;

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

<QueryTypeForm node={$QueryQueryType.data?.queryType} isFetching={$QueryQueryType.isFetching} on:mutation={mutation} />
