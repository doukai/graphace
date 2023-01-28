<script lang="ts">
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import type { User, QueryTypeUserListArgs, MutationTypeUserArgs } from '~/lib/types/schema';
	import { Query_userConnectionStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userConnection = data.Query_userConnection as Query_userConnectionStore;
	const Mutation_user = new Mutation_userStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserListArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userConnection.fetch({ variables: event.detail.args })
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
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_user.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.user);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTable
	nodes={$Query_userConnection.data?.userConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userConnection.data?.userConnection?.totalCount || 0}
	isFetching={$Query_userConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
