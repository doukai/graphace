<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { base } from '$app/paths'
	import { page } from '$app/stores';
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import {
		updateNodeParam,
		getChildPathParam
	} from '~/lib/utils';
	import { Mutation_roleStore } from '$houdini';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeRoleArgs;

	const Mutation_role = new Mutation_roleStore();

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

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<RoleCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
