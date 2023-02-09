<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
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

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_user_userProfile.mutate({
			user_id: user?.id,
			user_userProfile: event.detail.args,
			update: event.detail.update
		})
			.then((result) => {
				event.detail.then(result?.user?.userProfile);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../user-profile/${event.detail.path}`);
	};
</script>

{#if userProfile}
	<UserProfileForm
		node={$Query_user_userProfile.data?.user?.userProfile}
		isFetching={$Query_user_userProfile.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<UserProfileCreateForm on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
{/if}