<script lang="ts">
	import UserPhonesForm from '~/lib/components/objects/user-phones/UserPhonesForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userPhonesStore, Mutation_userPhonesStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserPhonesArgs, UserPhones } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_userPhones = data.Query_userPhones as Query_userPhonesStore;
	const Mutation_userPhones = new Mutation_userPhonesStore();

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

<UserPhonesForm node={$Query_userPhones.data?.userPhones} isFetching={$Query_userPhones.fetching} on:mutation={mutation} />
