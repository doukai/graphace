<script lang="ts">
	import UserTest1Form from '~/lib/components/objects/user-test1/UserTest1Form.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationUserTest1 } from '$houdini';
	import type { MutationTypeUserTest1Args, UserTest1 } from '~/lib/types/schema';

	let node: MutationTypeUserTest1Args = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest1Args;
			then: (data: UserTest1 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUserTest1.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest1);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTest1Form {node} on:mutation={mutation} />
