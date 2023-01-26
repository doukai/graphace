<script lang="ts">
	import UserProfileForm from '~/lib/components/objects/user-profile/UserProfileForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userProfileStore, Mutation_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_userProfile = data.Query_userProfile as Query_userProfileStore;
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
</script>

<UserProfileForm node={$Query_userProfile.data?.userProfile} isFetching={$Query_userProfile.fetching} on:mutation={mutation} />
