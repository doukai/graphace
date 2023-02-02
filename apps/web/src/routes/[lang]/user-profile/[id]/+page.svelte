<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths'
	import UserProfileForm from '~/lib/components/objects/user-profile/UserProfileForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userProfileStore, Mutation_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';

	export let data: PageData;
	$: Query_userProfile = data.Query_userProfile as Query_userProfileStore;
	const Mutation_userProfile = new Mutation_userProfileStore();

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Mutation_userProfile.mutate({ ...event.detail.args, update: event.detail.update })
			.then((result) => {
				event.detail.then(result?.userProfile);
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

<UserProfileForm
	node={$Query_userProfile.data?.userProfile}
	isFetching={$Query_userProfile.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
