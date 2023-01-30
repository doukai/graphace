<script lang="ts">
	import UserPhonesTable from '~/lib/components/objects/user-phones/UserPhonesTable.svelte';
	import type { UserPhones, UserPhonesListArgs, MutationTypeUserPhonesArgs } from '~/lib/types/schema';
	import { Query_userPhonesListStore, Mutation_userPhonesStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userPhonesList = data.Query_userPhonesList as Query_userPhonesListStore;
	const Mutation_userPhones = new Mutation_userPhonesStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserPhonesListArgs;
			then: (data: (UserPhones | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userPhonesList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userPhonesList;
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
</script>
<UserPhonesTable
	nodes={$Query_userPhonesList.data?.userPhones}
	isFetching={$Query_userPhonesList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
/>
