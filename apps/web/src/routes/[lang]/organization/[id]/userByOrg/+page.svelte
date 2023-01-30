<script lang="ts">
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, QueryTypeUserListArgs, User } from '~/lib/types/schema';
	import { Query_organization_userByOrgStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_organization_userByOrg = data.Query_organization_userByOrg as Query_organization_userByOrgStore;
	$: organization = $Query_organization_userByOrg.data?.organization;
	const Mutation_user = new Mutation_userStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserListArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_organization_userByOrg.fetch({
			variables: { organization_id: { val: organization?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.organization?.userByOrgConnection?.edges?.map((edge) => edge?.node));
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
	nodes={$Query_organization_userByOrg.data?.organization?.userByOrgConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_organization_userByOrg.data?.organization?.userByOrgConnection?.totalCount || 0}
	isFetching={$Query_organization_userByOrg.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
