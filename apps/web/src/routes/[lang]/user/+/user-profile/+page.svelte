<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import UserProfileCreateForm from '~/lib/components/objects/user-profile/UserProfileCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type {
		MutationTypeUserArgs,
		MutationTypeUserProfileArgs,
		UserProfile
	} from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: parentNode = data.parentNode as MutationTypeUserArgs;
	$: node = data.node as MutationTypeUserProfileArgs;

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		parentNode.userProfile = event.detail.args;
		const url = new URL(previousPage, $page.url.href);
		url.searchParams.set('node', JSON.stringify(parentNode));
		goto(url);
	};

	const back = (event: CustomEvent<{}>) => {
		const url = new URL(previousPage, $page.url.href);
		url.searchParams.set('node', JSON.stringify(parentNode));
		goto(url);
	};

	const gotoField = (event: CustomEvent<{ path: string }>) => {
		const url = new URL(`../../user-profile/${event.detail.path}`, $page.url.href);
		url.searchParams.set('parentNode', JSON.stringify(node));
		goto(url);
	};
</script>

<UserProfileCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />