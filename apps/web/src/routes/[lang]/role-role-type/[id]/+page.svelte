<script lang="ts">
	import RoleRoleTypeForm from '~/lib/components/objects/role-role-type/RoleRoleTypeForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryRoleRoleTypeStore } from '$houdini';
	import { GQL_MutationRoleRoleType } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeRoleRoleTypeArgs, RoleRoleType } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryRoleRoleType = data.QueryRoleRoleType as QueryRoleRoleTypeStore;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleRoleTypeArgs;
			then: (data: RoleRoleType | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationRoleRoleType.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.roleRoleType);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<RoleRoleTypeForm node={$QueryRoleRoleType.data?.roleRoleType} isFetching={$QueryRoleRoleType.isFetching} on:mutation={mutation} />
