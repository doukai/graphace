<script lang="ts">
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import { Query_userProfile_userStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userProfile_user = data.Query_userProfile_user as Query_userProfile_userStore;
	const Mutation_user = new Mutation_userStore();

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

<UserForm
	node={$Query_userProfile_user.data?.userProfile?.user}
	isFetching={$Query_userProfile_user.fetching}
	on:mutation={mutation}
/>
