<script lang="ts">
	import UserTest1CreateForm from '~/lib/components/objects/user-test1/UserTest1CreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Mutation_userTest1Store } from '$houdini';
	import type { MutationTypeUserTest1Args, UserTest1 } from '~/lib/types/schema';

	const Mutation_userTest1 = new Mutation_userTest1Store();
	let node: MutationTypeUserTest1Args = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest1Args;
			then: (data: UserTest1 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userTest1.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest1);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTest1CreateForm {node} on:mutation={mutation} />
