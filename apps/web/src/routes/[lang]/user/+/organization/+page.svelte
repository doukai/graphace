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
		parentNode.organization = event.detail.args;
		$page.params = { node: JSON.stringify(parentNode) };
		goto(previousPage);
	};

	const back = (event: CustomEvent<{}>) => {
		$page.params = { node: JSON.stringify(parentNode) };
		goto(previousPage);
	};
</script>

<OrganizationCreateForm {node} on:mutation={mutation} on:back={back} />