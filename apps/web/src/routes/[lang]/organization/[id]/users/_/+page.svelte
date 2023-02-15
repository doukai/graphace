<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { updateNodeParam, getChildPathParam } from '~/lib/utils';
	import { Mutation_organization_usersStore } from '$houdini';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeUserArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Error>;

	const Mutation_organization_users = new Mutation_organization_usersStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_organization_users.mutate({
			organization_id: id,
			organization_users: [event.detail.args],
			mergeToList: ['users']
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

<UserCreateForm bind:node {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
