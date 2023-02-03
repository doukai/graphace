<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserConnectionTable from '~/lib/components/objects/user/UserConnectionTable.svelte';
	import type { User, QueryTypeUserConnectionArgs, MutationTypeUserArgs } from '~/lib/types/schema';
	import { Query_userConnectionStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userConnection = data.Query_userConnection as Query_userConnectionStore;
	const Mutation_user = new Mutation_userStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserConnectionArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userConnection?.edges?.map((edge) => edge?.node));
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
		to(`./user/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user/+`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./user/${event.detail.path}`);
	};
</script>
<UserConnectionTable
	nodes={$Query_userConnection.data?.userConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userConnection.data?.userConnection?.totalCount || 0}
	isFetching={$Query_userConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
