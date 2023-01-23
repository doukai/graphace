<script lang="ts">
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import type { User, QueryTypeUserListArgs, MutationTypeUserArgs } from '~/lib/types/schema';
	import { QueryUserConnectionStore, GQL_MutationUser } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryUserConnection = data.QueryUserConnection as QueryUserConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserListArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryUserConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUser.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.user);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTable
	nodes={$QueryUserConnection.data?.userConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryUserConnection.data?.userConnection?.totalCount || 0}
	isFetching={$QueryUserConnection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
