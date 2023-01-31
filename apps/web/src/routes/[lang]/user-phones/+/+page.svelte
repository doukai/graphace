<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import UserPhonesCreateForm from '~/lib/components/objects/user-phones/UserPhonesCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Mutation_userPhonesStore } from '$houdini';
	import type { MutationTypeUserPhonesArgs, UserPhones } from '~/lib/types/schema';

	const Mutation_userPhones = new Mutation_userPhonesStore();
	let node: MutationTypeUserPhonesArgs = {};

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs;
			then: (data: UserPhones | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userPhones.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userPhones);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};
</script>

<UserPhonesCreateForm {node} on:mutation={mutation} on:back={back} />
