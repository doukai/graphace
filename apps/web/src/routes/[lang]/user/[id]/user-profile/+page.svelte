<script lang="ts">
	import UserProfileForm from '~/lib/components/objects/user-profile/UserProfileForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';
	import { Query_user_userProfileStore, Mutation_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_user_userProfile = data.Query_user_userProfile as Query_user_userProfileStore;
	const Mutation_userProfile = new Mutation_userProfileStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userProfile.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userProfile);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserProfileForm
	node={$Query_user_userProfile.data?.user?.userProfile}
	isFetching={$Query_user_userProfile.fetching}
	on:mutation={mutation}
/>
