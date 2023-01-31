<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import UserRoleCreateForm from '~/lib/components/objects/user-role/UserRoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Mutation_userRoleStore } from '$houdini';
	import type { MutationTypeUserRoleArgs, UserRole } from '~/lib/types/schema';

	const Mutation_userRole = new Mutation_userRoleStore();
	let node: MutationTypeUserRoleArgs = {};

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			then: (data: UserRole | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userRole.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userRole);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};
</script>

<UserRoleCreateForm {node} on:mutation={mutation} on:back={back} />
