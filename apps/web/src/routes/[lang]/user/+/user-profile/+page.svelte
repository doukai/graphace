<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
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
	import {
		getNodeParam,
		updateNodeParam,
		getParentPathParam,
		getChildPathParam
	} from '~/lib/utils';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeUserProfileArgs;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
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
		to(`../../user-profile/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<UserProfileCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />