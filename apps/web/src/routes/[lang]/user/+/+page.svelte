<script lang="ts">
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationUser } from '$houdini';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';

	let node: MutationTypeUserArgs = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUser.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.user);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserForm {node} on:mutation={mutation} />
