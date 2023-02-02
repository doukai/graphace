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
	import {
		getNodeParam,
		updateNodeParam,
		getParentPathParam,
		getChildPathParam
	} from '~/lib/utils';
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
		const url = new URL(previousPage, $page.url.href);
		url.searchParams.set('node', updateNodeParam($page.url, event.detail.args));
		url.searchParams.set('path', getParentPathParam($page.url));
		goto(url);
	};

	const back = (event: CustomEvent<{}>) => {
		const url = new URL(previousPage, $page.url.href);
		url.searchParams.set('node', getNodeParam($page.url));
		url.searchParams.set('path', getParentPathParam($page.url));
		goto(url);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		const url = new URL(`../../user/${event.detail.path}`, $page.url.href);
		url.searchParams.set('node', updateNodeParam($page.url, node));
		url.searchParams.set('path', getChildPathParam($page.url, event.detail.name));
		goto(url);
	};
</script>

<UserCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />