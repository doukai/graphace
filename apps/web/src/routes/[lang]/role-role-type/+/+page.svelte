<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import { page } from '$app/stores';
	import RoleRoleTypeCreateForm from '~/lib/components/objects/role-role-type/RoleRoleTypeCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Mutation_roleRoleTypeStore } from '$houdini';
	import type { MutationTypeRoleRoleTypeArgs, RoleRoleType } from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeRoleRoleTypeArgs;

	const Mutation_roleRoleType = new Mutation_roleRoleTypeStore();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

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

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};

	const gotoField = (event: CustomEvent<{ path: string }>) => {
		const url = new URL(`./${event.detail.path}`, $page.url.href);
		url.searchParams.set('parentNode', JSON.stringify(node));
		goto(url);
	};
</script>

<RoleRoleTypeCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
