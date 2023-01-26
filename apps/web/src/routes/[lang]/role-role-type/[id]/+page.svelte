<script lang="ts">
	import RoleRoleTypeForm from '~/lib/components/objects/role-role-type/RoleRoleTypeForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_roleRoleTypeStore, Mutation_roleRoleTypeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeRoleRoleTypeArgs, RoleRoleType } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_roleRoleType = data.Query_roleRoleType as Query_roleRoleTypeStore;
	const Mutation_roleRoleType = new Mutation_roleRoleTypeStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleRoleTypeArgs;
			then: (data: RoleRoleType | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_roleRoleType.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.roleRoleType);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<RoleRoleTypeForm node={$Query_roleRoleType.data?.roleRoleType} isFetching={$Query_roleRoleType.fetching} on:mutation={mutation} />
