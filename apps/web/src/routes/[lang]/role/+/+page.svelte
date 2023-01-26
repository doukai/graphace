<script lang="ts">
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Mutation_roleStore } from '$houdini';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';

	const Mutation_role = new Mutation_roleStore();
	let node: MutationTypeRoleArgs = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			then: (data: Role | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_role.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.role);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<RoleCreateForm {node} on:mutation={mutation} />
