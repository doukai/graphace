<script lang="ts">
	import QueryTypeForm from '~/lib/components/objects/query-type/QueryTypeForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationQueryType } from '$houdini';
	import type { MutationTypeQueryTypeArgs, QueryType } from '~/lib/types/schema';

	let node: MutationTypeQueryTypeArgs = {};

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

<QueryTypeForm {node} on:mutation={mutation} />
