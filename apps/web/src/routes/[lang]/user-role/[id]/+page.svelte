<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import UserRoleForm from '~/lib/components/objects/user-role/UserRoleForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userRoleStore, Mutation_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserRoleArgs, UserRole } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_userRole = data.Query_userRole as Query_userRoleStore;
	const Mutation_userRole = new Mutation_userRoleStore();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			update?: boolean;
			then: (data: UserRole | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userRole.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userRole);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		goto(`./${event.detail.path}`);
	};
</script>

<UserRoleForm
	node={$Query_userRole.data?.userRole}
	isFetching={$Query_userRole.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
