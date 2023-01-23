<script lang="ts">
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationRole } from '$houdini';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';

	let node: MutationTypeRoleArgs = {};

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

<RoleForm {node} on:mutation={mutation} />
