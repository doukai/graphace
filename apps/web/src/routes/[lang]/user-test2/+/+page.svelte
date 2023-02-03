<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { base } from '$app/paths'
	import { page } from '$app/stores';
	import UserTest2CreateForm from '~/lib/components/objects/user-test2/UserTest2CreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import {
		updateNodeParam,
		getChildPathParam
	} from '~/lib/utils';
	import { Mutation_userTest2Store } from '$houdini';
	import type { MutationTypeUserTest2Args, UserTest2 } from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeUserTest2Args;

	const Mutation_userTest2 = new Mutation_userTest2Store();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userTest2.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userTest2);
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

<UserTest2CreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
