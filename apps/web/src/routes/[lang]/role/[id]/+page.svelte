<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { base } from '$app/paths'
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_roleStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_role = data.Query_role as Query_roleStore;
	const Mutation_role = new Mutation_roleStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_role.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.role);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`);
	};
</script>

<RoleForm
	node={$Query_role.data?.role}
	isFetching={$Query_role.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
