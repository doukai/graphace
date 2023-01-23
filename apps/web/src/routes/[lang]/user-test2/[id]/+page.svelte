<script lang="ts">
	import UserTest2Form from '~/lib/components/objects/user-test2/UserTest2Form.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryUserTest2Store } from '$houdini';
	import { GQL_MutationUserTest2 } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserTest2Args, UserTest2 } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryUserTest2 = data.QueryUserTest2 as QueryUserTest2Store;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUserTest2.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest2);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserTest2Form node={$QueryUserTest2.data?.userTest2} isFetching={$QueryUserTest2.isFetching} on:mutation={mutation} />
