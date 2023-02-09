<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_user = data.Query_user as Query_userStore;
	const Mutation_user = new Mutation_userStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_user.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.user);
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

<UserForm
	node={$Query_user.data?.user}
	isFetching={$Query_user.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
