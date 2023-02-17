<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserProfileForm from '~/lib/components/objects/user-profile/UserProfileForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_userProfileStore, Mutation_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userProfile = data.Query_userProfile as Query_userProfileStore;
	$: node = $Query_userProfile.data?.userProfile;
	const Mutation_userProfile = new Mutation_userProfileStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserProfile', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_userProfile.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userProfile);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`);
	};
</script>

<UserProfileForm
	{node}
	{errors}
	isFetching={$Query_userProfile.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
