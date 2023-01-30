<script lang="ts">
	import UserProfileTable from '~/lib/components/objects/user-profile/UserProfileTable.svelte';
	import type { UserProfile, UserProfileListArgs, MutationTypeUserProfileArgs } from '~/lib/types/schema';
	import { Query_userProfileListStore, Mutation_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userProfileList = data.Query_userProfileList as Query_userProfileListStore;
	const Mutation_userProfile = new Mutation_userProfileStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserProfileListArgs;
			then: (data: (UserProfile | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userProfileList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userProfileList;
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

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
<UserProfileTable
	nodes={$Query_userProfileList.data?.userProfile}
	isFetching={$Query_userProfileList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
