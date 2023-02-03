<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import RoleRoleTypeConnectionTable from '~/lib/components/objects/role-role-type/RoleRoleTypeConnectionTable.svelte';
	import type { RoleRoleType, QueryTypeRoleRoleTypeConnectionArgs, MutationTypeRoleRoleTypeArgs } from '~/lib/types/schema';
	import { Query_roleRoleTypeConnectionStore, Mutation_roleRoleTypeStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_roleRoleTypeConnection = data.Query_roleRoleTypeConnection as Query_roleRoleTypeConnectionStore;
	const Mutation_roleRoleType = new Mutation_roleRoleTypeStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleRoleTypeConnectionArgs;
			then: (data: (RoleRoleType | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_roleRoleTypeConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleRoleTypeConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleRoleTypeArgs;
			update?: boolean;
			then: (data: RoleRoleType | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_roleRoleType.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.roleRoleType);
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
		to(`./role-role-type/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./role-role-type/+`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./role-role-type/${event.detail.path}`);
	};
</script>
<RoleRoleTypeConnectionTable
	nodes={$Query_roleRoleTypeConnection.data?.roleRoleTypeConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_roleRoleTypeConnection.data?.roleRoleTypeConnection?.totalCount || 0}
	isFetching={$Query_roleRoleTypeConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
