<script lang="ts">
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import type { User, UserListArgs, MutationTypeUserArgs } from '~/lib/types/schema';
	import { Query_userListStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userList = data.Query_userList as Query_userListStore;
	const Mutation_user = new Mutation_userStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserListArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userList;
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
	nodes={$Query_userList.data?.user}
	isFetching={$Query_userList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
