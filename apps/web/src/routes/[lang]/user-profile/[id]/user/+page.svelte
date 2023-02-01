<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import { Query_userProfile_userStore, Mutation_userProfile_userStore } from '$houdini';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: Query_userProfile_user = data.Query_userProfile_user as Query_userProfile_userStore;
	$: userProfile = $Query_userProfile_user.data?.userProfile;
	$: user = userProfile?.user;
	const Mutation_userProfile_user = new Mutation_userProfile_userStore();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userProfile_user.mutate({
			userProfile_id: userProfile?.id,
			userProfile_user: event.detail.args,
			update: event.detail.update
		})
			.then((result) => {
				event.detail.then(result?.userProfile?.user);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const back = (event: CustomEvent<{}>) => {
		goto(previousPage);
	};
</script>

{#if user}
	<UserForm
		node={$Query_userProfile_user.data?.userProfile?.user}
		isFetching={$Query_userProfile_user.fetching}
		on:mutation={mutation}
		on:back={back}
	/>
{:else}
	<UserCreateForm on:mutation={mutation} on:back={back} />
{/if}