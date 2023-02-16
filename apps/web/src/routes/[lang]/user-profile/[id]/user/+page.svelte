<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import { Query_userProfile_userStore, Mutation_userProfile_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userProfile_user = data.Query_userProfile_user as Query_userProfile_userStore;
	$: userProfile = $Query_userProfile_user.data?.userProfile;
	$: node = userProfile?.user;
	const Mutation_userProfile_user = new Mutation_userProfile_userStore();
	let errors: Record<number, Error> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		validate('User', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
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
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../user/${event.detail.path}`);
	};
</script>

{#if node}
	<UserForm
		{node}
		{errors}
		isFetching={$Query_userProfile_user.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<UserCreateForm {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
{/if}