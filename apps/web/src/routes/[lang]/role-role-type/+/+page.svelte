<script lang="ts">
	import RoleRoleTypeCreateForm from '~/lib/components/objects/role-role-type/RoleRoleTypeCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationRoleRoleType } from '$houdini';
	import type { MutationTypeRoleRoleTypeArgs, RoleRoleType } from '~/lib/types/schema';

	let node: MutationTypeRoleRoleTypeArgs = {};

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

<RoleRoleTypeCreateForm {node} on:mutation={mutation} />
