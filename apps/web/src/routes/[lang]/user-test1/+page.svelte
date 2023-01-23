<script lang="ts">
	import UserTest1Table from '~/lib/components/objects/user-test1/UserTest1Table.svelte';
	import type { UserTest1, QueryTypeUserTest1ListArgs, MutationTypeUserTest1Args } from '~/lib/types/schema';
	import { QueryUserTest1ConnectionStore, GQL_MutationUserTest1 } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryUserTest1Connection = data.QueryUserTest1Connection as QueryUserTest1ConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserTest1ListArgs;
			then: (data: (UserTest1 | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryUserTest1Connection.fetch({ variables: event.detail.args })
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
			then: (data: UserTest1 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUserTest1.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest1);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTest1Table
	nodes={$QueryUserTest1Connection.data?.userTest1Connection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryUserTest1Connection.data?.userTest1Connection?.totalCount || 0}
	isFetching={$QueryUserTest1Connection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
