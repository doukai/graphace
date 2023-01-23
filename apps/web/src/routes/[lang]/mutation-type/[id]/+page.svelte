<script lang="ts">
	import MutationTypeForm from '~/lib/components/objects/mutation-type/MutationTypeForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryMutationTypeStore } from '$houdini';
	import { GQL_MutationMutationType } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeMutationTypeArgs, MutationType } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryMutationType = data.QueryMutationType as QueryMutationTypeStore;

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

<MutationTypeForm node={$QueryMutationType.data?.mutationType} isFetching={$QueryMutationType.isFetching} on:mutation={mutation} />
