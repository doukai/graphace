<script lang="ts">
	import UserPhonesTable from '~/lib/components/objects/user-phones/UserPhonesTable.svelte';
	import type { UserPhones, QueryTypeUserPhonesListArgs, MutationTypeUserPhonesArgs } from '~/lib/types/schema';
	import { QueryUserPhonesConnectionStore, GQL_MutationUserPhones } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryUserPhonesConnection = data.QueryUserPhonesConnection as QueryUserPhonesConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserPhonesListArgs;
			then: (data: (UserPhones | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryUserPhonesConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userPhonesConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs;
			then: (data: UserPhones | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUserPhones.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userPhones);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserPhonesTable
	nodes={$QueryUserPhonesConnection.data?.userPhonesConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryUserPhonesConnection.data?.userPhonesConnection?.totalCount || 0}
	isFetching={$QueryUserPhonesConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
