<script lang="ts">
	import UserProfileTable from '~/lib/components/objects/user-profile/UserProfileTable.svelte';
	import type { UserProfile, QueryTypeUserProfileListArgs, MutationTypeUserProfileArgs } from '~/lib/types/schema';
	import { QueryUserProfileConnectionStore, GQL_MutationUserProfile } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryUserProfileConnection = data.QueryUserProfileConnection as QueryUserProfileConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserProfileListArgs;
			then: (data: (UserProfile | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryUserProfileConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userProfileConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

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

<UserProfileTable
	nodes={$QueryUserProfileConnection.data?.userProfileConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryUserProfileConnection.data?.userProfileConnection?.totalCount || 0}
	isFetching={$QueryUserProfileConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
