<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import UserProfileForm from '~/lib/components/objects/user-profile/UserProfileForm.svelte';
	import UserProfileCreateForm from '~/lib/components/objects/user-profile/UserProfileCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';
	import { Query_user_userProfileStore, Mutation_user_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_user_userProfile = data.Query_user_userProfile as Query_user_userProfileStore;
	$: user = $Query_user_userProfile.data?.user;
	$: userProfile = user?.userProfile;
	const Mutation_user_userProfile = new Mutation_user_userProfileStore();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const pageArgs: MutationTypeUserProfileArgs = {};
	if ($page.params.user) {
		pageArgs.user = JSON.parse($page.params.user);
	}

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		if (user?.id) {
			Mutation_user_userProfile.mutate({
				user_id: user?.id,
				user_userProfile: { ...pageArgs, ...event.detail.args },
				update: event.detail.update
			})
				.then((result) => {
					event.detail.then(result?.user?.userProfile);
				})
				.catch((error) => {
					event.detail.catch(error);
				});
		} else {
			$page.params = { userProfile: JSON.stringify(event.detail.args) };
			goto(previousPage);
		}
	};

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};
</script>

{#if userProfile}
	<UserProfileForm
		node={$Query_user_userProfile.data?.user?.userProfile}
		isFetching={$Query_user_userProfile.fetching}
		on:mutation={mutation}
		on:back={back}
	/>
{:else}
	<UserProfileCreateForm on:mutation={mutation} on:back={back} />
{/if}