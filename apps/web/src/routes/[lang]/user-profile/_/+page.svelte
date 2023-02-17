<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserProfileCreateForm from '~/lib/components/objects/user-profile/UserProfileCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '~/lib/utils';
	import { Mutation_userProfileStore } from '$houdini';
	import type { MutationTypeUserProfileArgs, UserProfile } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeUserProfileArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_userProfile = new Mutation_userProfileStore();

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
		to(`./${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<UserProfileCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
