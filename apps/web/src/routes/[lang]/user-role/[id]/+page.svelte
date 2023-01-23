<script lang="ts">
	import UserRoleForm from '~/lib/components/objects/user-role/UserRoleForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryUserRoleStore } from '$houdini';
	import { GQL_MutationUserRole } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserRoleArgs, UserRole } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryUserRole = data.QueryUserRole as QueryUserRoleStore;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			then: (data: UserRole | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationUserRole.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userRole);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<UserRoleForm node={$QueryUserRole.data?.userRole} isFetching={$QueryUserRole.isFetching} on:mutation={mutation} />
