<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserProfileCreateForm from '~/lib/components/objects/user-profile/UserProfileCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import {
		updateNodeParam,
		getChildPathParam
	} from '~/lib/utils';
	import { Mutation_userProfileStore } from '$houdini';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeUserProfileArgs;

	const Mutation_userProfile = new Mutation_userProfileStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userProfile.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userProfile);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<UserProfileCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
