<script lang="ts">
	import UserForm from '~/lib/components/types/user/UserForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { Query_userStore } from '$houdini';
	import { GQL_Mutation_user } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserArgs, User } from '~/gql/generated/schema';

	export let data: PageData;
	$: QueryUser = data.QueryUser as Query_userStore;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_Mutation_user.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.user);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserForm node={$QueryUser.data?.user} isFetching={$QueryUser.isFetching} on:mutation={mutation} />
