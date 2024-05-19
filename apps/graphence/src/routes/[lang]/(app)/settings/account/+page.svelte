<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import CurrentUserForm from '~/lib/components/settings/CurrentUserForm.svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import type { UserInput } from '~/lib/types/schema';
	import { Query_currentUserStore, Mutation_currentUserUpdateStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_currentUser = data.Query_currentUser as Query_currentUserStore;
	$: node = $Query_currentUser.data?.currentUser;
	$: urlName($page.url, node?.name || '');
	const Mutation_currentUserUpdate = new Mutation_currentUserUpdateStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: UserInput;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_user_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_currentUserUpdate.mutate({ userInput: event.detail.args }).then((result) => {
					if (result.errors) {
						event.detail.catch(result.errors);
					} else {
						event.detail.then(result?.data?.currentUserUpdate);
					}
				});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	<CurrentUserForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$Query_currentUser.fetching}
		on:mutation={mutation}
		on:back={back}
	/>
</Card>
