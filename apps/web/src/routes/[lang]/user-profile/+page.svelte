<script lang="ts">
	import { goto } from '$app/navigation';
	import UserProfileConnectionTable from '~/lib/components/objects/user-profile/UserProfileConnectionTable.svelte';
	import type { UserProfile, QueryTypeUserProfileConnectionArgs, MutationTypeUserProfileArgs } from '~/lib/types/schema';
	import { Query_userProfileConnectionStore, Mutation_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userProfileConnection = data.Query_userProfileConnection as Query_userProfileConnectionStore;
	const Mutation_userProfile = new Mutation_userProfileStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserProfileConnectionArgs;
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

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		goto(`./user-profile/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		goto(`./user-profile/+`);
	};

	const gotoField = (event: CustomEvent<{ path: string }>) => {
		goto(`./user-profile/${event.detail.path}`);
	};
</script>
<UserProfileConnectionTable
	nodes={$Query_userProfileConnection.data?.userProfileConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userProfileConnection.data?.userProfileConnection?.totalCount || 0}
	isFetching={$Query_userProfileConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
