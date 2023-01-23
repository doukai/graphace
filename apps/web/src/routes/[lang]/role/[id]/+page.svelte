<script lang="ts">
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryRoleStore } from '$houdini';
	import { GQL_MutationRole } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryRole = data.QueryRole as QueryRoleStore;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			then: (data: Role | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationRole.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.role);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<RoleForm node={$QueryRole.data?.role} isFetching={$QueryRole.isFetching} on:mutation={mutation} />
