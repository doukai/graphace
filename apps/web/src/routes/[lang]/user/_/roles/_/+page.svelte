<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Mutation_user_rolesStore } from '$houdini';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';
	import {
		updateNodeParam,
		getChildPathParam
	} from '~/lib/utils';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeRoleArgs;
	$: id = data.id as string;

	const Mutation_user_roles = new Mutation_user_rolesStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			then: (data: Role | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		ot({
			node: updateNodeParam($page.url, event.detail.args)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../role/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<RoleCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
