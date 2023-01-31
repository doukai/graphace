<script lang="ts">
	import { goto } from '$app/navigation';
	import RoleConnectionTable from '~/lib/components/objects/role/RoleConnectionTable.svelte';
	import type { Role, QueryTypeRoleConnectionArgs, MutationTypeRoleArgs } from '~/lib/types/schema';
	import { Query_roleConnectionStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_roleConnection = data.Query_roleConnection as Query_roleConnectionStore;
	const Mutation_role = new Mutation_roleStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleConnectionArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_roleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_role.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.role);
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
		goto(`./role/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		goto(`./role/+`);
	};

	const gotoField = (event: CustomEvent<{ path: string }>) => {
		goto(`./role/${event.detail.path}`);
	};
</script>
<RoleConnectionTable
	nodes={$Query_roleConnection.data?.roleConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_roleConnection.data?.roleConnection?.totalCount || 0}
	isFetching={$Query_roleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
