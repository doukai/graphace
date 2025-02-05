<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors, JsonSchema } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import CurrentUserForm from '~/lib/components/settings/CurrentUserForm.svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import type { UserInput } from '~/lib/types/schema';
	import type { Query_currentUser_Store } from '~/lib/stores/query/query_currentUser_store';
	import type { Mutation_currentUserUpdate_Store } from '~/lib/stores/mutation/mutation_currentUserUpdate_store';
	import type { PageData } from './$types';
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';
	import { getContext } from 'svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: query_currentUser_Store = data.query_currentUser_Store as Query_currentUser_Store;
	$: node = $query_currentUser_Store.response.data?.currentUser;
	$: urlName($page.url, $LL.graphence.components.userMenu.profile());
	$: mutation_currentUserUpdate_Store =
		data.mutation_currentUserUpdate_Store as Mutation_currentUserUpdate_Store;
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: UserInput;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_currentUserUpdate_Arguments', { userInput: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_currentUserUpdate_Store.fetch({ userInput: event.detail.args }).then((result) => {
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
		isFetching={$query_currentUser_Store.isFetching}
		on:mutation={mutation}
		on:back={back}
	/>
</Card>
