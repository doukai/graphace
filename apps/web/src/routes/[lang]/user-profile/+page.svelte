<script lang="ts">
	import UserProfileTable from '~/lib/components/objects/user-profile/UserProfileTable.svelte';
	import type { UserProfile, QueryTypeUserProfileListArgs, MutationTypeUserProfileArgs } from '~/lib/types/schema';
	import { Query_userProfileConnectionStore, Mutation_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userProfileConnection = data.Query_userProfileConnection as Query_userProfileConnectionStore;
	const Mutation_userProfile = new Mutation_userProfileStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserProfileListArgs;
			then: (data: (UserProfile | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userProfileConnection.fetch({ variables: event.detail.args })
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
	nodes={$Query_userProfileConnection.data?.userProfileConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userProfileConnection.data?.userProfileConnection?.totalCount || 0}
	isFetching={$Query_userProfileConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
