<script lang="ts">
	import UserTest2Table from '~/lib/components/objects/user-test2/UserTest2Table.svelte';
	import type { UserTest2, QueryTypeUserTest2ListArgs, MutationTypeUserTest2Args } from '~/lib/types/schema';
	import { Query_userTest2ConnectionStore, Mutation_userTest2_updateStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userTest2Connection = data.Query_userTest2Connection as Query_userTest2ConnectionStore;
	const Mutation_userTest2_update = new Mutation_userTest2_updateStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserTest2ListArgs;
			then: (data: (UserTest2 | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userTest2Connection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userTest2Connection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userTest2_update.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest2);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTest2Table
	nodes={$Query_userTest2Connection.data?.userTest2Connection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userTest2Connection.data?.userTest2Connection?.totalCount || 0}
	isFetching={$Query_userTest2Connection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
