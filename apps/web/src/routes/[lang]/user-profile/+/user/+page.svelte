<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type {
		MutationTypeUserProfileArgs,
		MutationTypeUserArgs,
		User
	} from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: parentNode = data.parentNode as MutationTypeUserProfileArgs;
	$: node = data.node as MutationTypeUserArgs;

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		parentNode.user = event.detail.args;
		$page.params = { node: JSON.stringify(parentNode) };
		goto(previousPage);
	};

	const back = (event: CustomEvent<{}>) => {
		$page.params = { node: JSON.stringify(parentNode) };
		goto(previousPage);
	};
</script>

<UserCreateForm {node} on:mutation={mutation} on:back={back} />