<script lang="ts">
	import UserTest2CreateForm from '~/lib/components/objects/user-test2/UserTest2CreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationUserTest2 } from '$houdini';
	import type { MutationTypeUserTest2Args, UserTest2 } from '~/lib/types/schema';

	let node: MutationTypeUserTest2Args = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUserTest2.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest2);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTest2CreateForm {node} on:mutation={mutation} />
