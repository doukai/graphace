<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserPhonesCreateForm from '~/lib/components/objects/user-phones/UserPhonesCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import {
		updateNodeParam,
		getChildPathParam
	} from '~/lib/utils';
	import { Mutation_userPhonesStore } from '$houdini';
	import type { MutationTypeUserPhonesArgs, UserPhones } from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeUserPhonesArgs;

	const Mutation_userPhones = new Mutation_userPhonesStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs;
			then: (data: UserPhones | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userPhones.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.userPhones);
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

<UserPhonesCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
