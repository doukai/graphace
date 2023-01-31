<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import UserTest2CreateForm from '~/lib/components/objects/user-test2/UserTest2CreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Mutation_userTest2Store } from '$houdini';
	import type { MutationTypeUserTest2Args, UserTest2 } from '~/lib/types/schema';

	const Mutation_userTest2 = new Mutation_userTest2Store();
	let node: MutationTypeUserTest2Args = {};

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userTest2.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest2);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};
</script>

<UserTest2CreateForm {node} on:mutation={mutation} on:back={back} />
