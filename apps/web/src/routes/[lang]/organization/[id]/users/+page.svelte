<script lang="ts">
	import { goto } from '$app/navigation';
	import UserConnectionTable from '~/lib/components/objects/user/UserConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, QueryTypeUserConnectionArgs, User } from '~/lib/types/schema';
	import { Query_organization_usersStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_organization_users = data.Query_organization_users as Query_organization_usersStore;
	$: organization = $Query_organization_users.data?.organization;
	const Mutation_user = new Mutation_userStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserConnectionArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_organization_users.fetch({
			variables: { organization_id: { val: organization?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.organization?.usersConnection?.edges?.map((edge) => edge?.node));
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

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		goto(`../../user/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		goto(`../../user/+`);
	};

	const gotoField = (event: CustomEvent<{ path: string }>) => {
		goto(`../../user/${event.detail.path}`);
	};
</script>
<UserConnectionTable
	nodes={$Query_organization_users.data?.organization?.usersConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_organization_users.data?.organization?.usersConnection?.totalCount || 0}
	isFetching={$Query_organization_users.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
