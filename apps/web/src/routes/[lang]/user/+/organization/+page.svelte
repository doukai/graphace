<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
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
	$: node = data.node as MutationTypeOrganizationArgs;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeOrganizationArgs;
			update?: boolean;
			then: (data: Organization | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		ot({
			node: updateNodeParam($page.url, event.detail.args),
			path: getParentPathParam($page.url)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			path: getParentPathParam($page.url)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../organization/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<OrganizationCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />