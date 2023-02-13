<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { updateNodeParam, getChildPathParam } from '~/lib/utils';
	import { Mutation_organization_userByOrgStore } from '$houdini';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeUserArgs;
	$: id = data.id as string;

	const Mutation_organization_userByOrg = new Mutation_organization_userByOrgStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_organization_userByOrg.mutate({
			organization_id: id,
			organization_userByOrg: [event.detail.args],
			mergeToList: ['userByOrg']
		})
			.then((result) => {
				event.detail.then(null);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../user/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<UserCreateForm bind:node on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
