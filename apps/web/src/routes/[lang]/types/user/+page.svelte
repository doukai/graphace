<script lang="ts">
	import UserTable from '~/lib/components/types/user/UserTable.svelte';
	import type { User, QueryTypeUserListArgs, MutationTypeUserArgs } from '~/gql/generated/schema';
	import { Query_userConnectionStore, GQL_Mutation_user_update } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryUserConnection = data.QueryUserConnection as Query_userConnectionStore;

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
		GQL_Mutation_user_update.mutate(event.detail.args)
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
