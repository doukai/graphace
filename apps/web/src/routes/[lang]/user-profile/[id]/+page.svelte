<script lang="ts">
	import UserProfileForm from '~/lib/components/objects/user-profile/UserProfileForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryUserProfileStore } from '$houdini';
	import { GQL_MutationUserProfile } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryUserProfile = data.QueryUserProfile as QueryUserProfileStore;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUserProfile.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userProfile);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserProfileForm node={$QueryUserProfile.data?.userProfile} isFetching={$QueryUserProfile.isFetching} on:mutation={mutation} />
