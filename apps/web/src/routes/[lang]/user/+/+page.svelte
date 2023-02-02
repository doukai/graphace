<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import { page } from '$app/stores';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import {
		updateNodeParam,
		getChildPathParam
	} from '~/lib/utils';
	import { Mutation_userStore } from '$houdini';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeUserArgs;

	const Mutation_user = new Mutation_userStore();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_user.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.user);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		const url = new URL(`./${event.detail.path}`, $page.url.href);
		url.searchParams.set('node', updateNodeParam($page.url, node));
		url.searchParams.set('path', getChildPathParam($page.url, event.detail.name));
		goto(url);
	};
</script>

<UserCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
