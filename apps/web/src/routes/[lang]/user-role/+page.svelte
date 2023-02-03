<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserRoleConnectionTable from '~/lib/components/objects/user-role/UserRoleConnectionTable.svelte';
	import type { UserRole, QueryTypeUserRoleConnectionArgs, MutationTypeUserRoleArgs } from '~/lib/types/schema';
	import { Query_userRoleConnectionStore, Mutation_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userRoleConnection = data.Query_userRoleConnection as Query_userRoleConnectionStore;
	const Mutation_userRole = new Mutation_userRoleStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserRoleConnectionArgs;
			then: (data: (UserRole | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userRoleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userRoleConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			update?: boolean;
			then: (data: UserRole | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userRole.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userRole);
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
		to(`./user-role/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user-role/+`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./user-role/${event.detail.path}`);
	};
</script>
<UserRoleConnectionTable
	nodes={$Query_userRoleConnection.data?.userRoleConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userRoleConnection.data?.userRoleConnection?.totalCount || 0}
	isFetching={$Query_userRoleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
