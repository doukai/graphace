<script lang="ts">
	import UserTest2Table from '~/lib/components/objects/user-test2/UserTest2Table.svelte';
	import type { UserTest2, UserTest2ListArgs, MutationTypeUserTest2Args } from '~/lib/types/schema';
	import { Query_userTest2ListStore, Mutation_userTest2Store } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userTest2List = data.Query_userTest2List as Query_userTest2ListStore;
	const Mutation_userTest2 = new Mutation_userTest2Store();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserTest2ListArgs;
			then: (data: (UserTest2 | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userTest2List.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userTest2List;
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			update?: boolean;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userTest2.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userTest2);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>
<UserTest2Table
	nodes={$Query_userTest2List.data?.userTest2}
	isFetching={$Query_userTest2List.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
