<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserPhonesConnectionTable from '~/lib/components/objects/user-phones/UserPhonesConnectionTable.svelte';
	import type { UserPhones, QueryTypeUserPhonesConnectionArgs, MutationTypeUserPhonesArgs } from '~/lib/types/schema';
	import { Query_userPhonesConnectionStore, Mutation_userPhonesStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userPhonesConnection = data.Query_userPhonesConnection as Query_userPhonesConnectionStore;
	const Mutation_userPhones = new Mutation_userPhonesStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserPhonesConnectionArgs;
			then: (data: (UserPhones | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userPhonesConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userPhonesConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs;
			update?: boolean;
			then: (data: UserPhones | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userPhones.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userPhones);
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
		to(`./user-phones/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user-phones/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./user-phones/${event.detail.path}`);
	};
</script>
<UserPhonesConnectionTable
	nodes={$Query_userPhonesConnection.data?.userPhonesConnection?.edges?.map((edge) => edge?.node)}
	totalCount={$Query_userPhonesConnection.data?.userPhonesConnection?.totalCount || 0}
	isFetching={$Query_userPhonesConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
