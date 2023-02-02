<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import UserTest2Form from '~/lib/components/objects/user-test2/UserTest2Form.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userTest2Store, Mutation_userTest2Store } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserTest2Args, UserTest2 } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_userTest2 = data.Query_userTest2 as Query_userTest2Store;
	const Mutation_userTest2 = new Mutation_userTest2Store();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			update?: boolean;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userTest2.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userTest2);
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

<UserTest2Form
	node={$Query_userTest2.data?.userTest2}
	isFetching={$Query_userTest2.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
