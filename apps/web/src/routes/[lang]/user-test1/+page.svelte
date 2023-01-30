<script lang="ts">
	import UserTest1Table from '~/lib/components/objects/user-test1/UserTest1Table.svelte';
	import type { UserTest1, UserTest1ListArgs, MutationTypeUserTest1Args } from '~/lib/types/schema';
	import { Query_userTest1ListStore, Mutation_userTest1Store } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userTest1List = data.Query_userTest1List as Query_userTest1ListStore;
	const Mutation_userTest1 = new Mutation_userTest1Store();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserTest1ListArgs;
			then: (data: (UserTest1 | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userTest1List.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userTest1List;
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
	nodes={$Query_userTest1List.data?.userTest1}
	isFetching={$Query_userTest1List.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
