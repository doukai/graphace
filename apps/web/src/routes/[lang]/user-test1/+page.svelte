<script lang="ts">
	import UserTest1Table from '~/lib/components/objects/user-test1/UserTest1Table.svelte';
	import type { UserTest1, QueryTypeUserTest1ListArgs, MutationTypeUserTest1Args } from '~/lib/types/schema';
	import { Query_userTest1ConnectionStore, Mutation_userTest1Store } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userTest1Connection = data.Query_userTest1Connection as Query_userTest1ConnectionStore;
	const Mutation_userTest1 = new Mutation_userTest1Store();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserTest1ListArgs;
			then: (data: (UserTest1 | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userTest1Connection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userTest1Connection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest1Args;
			update?: boolean;
			then: (data: UserTest1 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userTest1.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userTest1);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTest1Table
	nodes={$Query_userTest1Connection.data?.userTest1Connection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userTest1Connection.data?.userTest1Connection?.totalCount || 0}
	isFetching={$Query_userTest1Connection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
