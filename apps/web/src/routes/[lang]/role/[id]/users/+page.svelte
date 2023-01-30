<script lang="ts">
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, QueryTypeUserListArgs, User } from '~/lib/types/schema';
	import { Query_role_usersStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_role_users = data.Query_role_users as Query_role_usersStore;
	$: role = $Query_role_users.data?.role;
	const Mutation_user = new Mutation_userStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserListArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_role_users.fetch({
			variables: { role_id: { val: role?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.role?.usersConnection?.edges?.map((edge) => edge?.node));
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
	nodes={$Query_role_users.data?.role?.usersConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_role_users.data?.role?.usersConnection?.totalCount || 0}
	isFetching={$Query_role_users.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
