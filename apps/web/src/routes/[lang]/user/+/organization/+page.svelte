<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import OrganizationCreateForm from '~/lib/components/objects/organization/OrganizationCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type {
		MutationTypeUserArgs,
		MutationTypeOrganizationArgs,
		Organization
	} from '~/lib/types/schema';
	import {
		getNodeParam,
		updateNodeParam,
		getParentPathParam,
		getChildPathParam
	} from '~/lib/utils';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: parentNode = data.parentNode as MutationTypeUserArgs;
	$: node = data.node as MutationTypeOrganizationArgs;

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeOrganizationArgs;
			update?: boolean;
			then: (data: Organization | null | undefined) => void;
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
		const url = new URL(`../../organization/${event.detail.path}`, $page.url.href);
		url.searchParams.set('node', updateNodeParam($page.url, node));
		url.searchParams.set('path', getChildPathParam($page.url, event.detail.name));
		goto(url);
	};
</script>

<OrganizationCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />