<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserProfileForm from '~/lib/components/objects/user-profile/UserProfileForm.svelte';
	import UserProfileCreateForm from '~/lib/components/objects/user-profile/UserProfileCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '~/lib/utils';
	import { Query_user_userProfileStore, Mutation_user_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeUserProfileArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_user_userProfile = data.Query_user_userProfile as Query_user_userProfileStore;
	$: user = $Query_user_userProfile.data?.user;
	$: node = user?.userProfile;
	const Mutation_user_userProfile = new Mutation_user_userProfileStore();
	let errors: Record<number, Errors> = {};

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
				Mutation_user_userProfile.mutate({
					user_id: user?.id,
					user_userProfile: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.user?.userProfile);
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
		to(`../../user-profile/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<UserProfileForm
		{node}
		{errors}
		isFetching={$Query_user_userProfile.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<UserProfileCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}