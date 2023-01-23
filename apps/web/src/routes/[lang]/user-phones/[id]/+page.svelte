<script lang="ts">
	import UserPhonesForm from '~/lib/components/objects/user-phones/UserPhonesForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryUserPhonesStore } from '$houdini';
	import { GQL_MutationUserPhones } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserPhonesArgs, UserPhones } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryUserPhones = data.QueryUserPhones as QueryUserPhonesStore;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs;
			then: (data: UserPhones | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUserPhones.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userPhones);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserPhonesForm node={$QueryUserPhones.data?.userPhones} isFetching={$QueryUserPhones.isFetching} on:mutation={mutation} />
