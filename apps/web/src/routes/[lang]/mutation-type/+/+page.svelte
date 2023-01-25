<script lang="ts">
	import MutationTypeCreateForm from '~/lib/components/objects/mutation-type/MutationTypeCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationMutationType } from '$houdini';
	import type { MutationTypeMutationTypeArgs, MutationType } from '~/lib/types/schema';

	let node: MutationTypeMutationTypeArgs = {};

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

<MutationTypeCreateForm {node} on:mutation={mutation} />
