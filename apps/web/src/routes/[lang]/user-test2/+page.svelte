<script lang="ts">
	import UserTest2Table from '~/lib/components/objects/user-test2/UserTest2Table.svelte';
	import type { UserTest2, QueryTypeUserTest2ListArgs, MutationTypeUserTest2Args } from '~/lib/types/schema';
	import { QueryUserTest2ConnectionStore, GQL_MutationUserTest2 } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryUserTest2Connection = data.QueryUserTest2Connection as QueryUserTest2ConnectionStore;

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserTest2ListArgs;
			then: (data: (UserTest2 | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		QueryUserTest2Connection.fetch({ variables: event.detail.args })
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
		GQL_MutationUserTest2.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest2);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTest2Table
	nodes={$QueryUserTest2Connection.data?.userTest2Connection?.edges?.map((edge) => edge?.node)}
	totalCount={$QueryUserTest2Connection.data?.userTest2Connection?.totalCount || 0}
	isFetching={$QueryUserTest2Connection.isFetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
