<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import type { Query_currentUser_Store } from '~/lib/stores/query/query_currentUser_store';
	import type { Mutation_currentUserUpdate_Store } from '~/lib/stores/mutation/mutation_currentUserUpdate_store';
	import CurrentUserForm from '~/lib/components/settings/CurrentUserForm.svelte';
	import { validator, buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import { LL } from '$i18n/i18n-svelte';
	import type { UserInput } from '~/lib/types/schema';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;

	$: query_currentUser_Store = data.query_currentUser_Store as Query_currentUser_Store;
	$: node = $query_currentUser_Store.response.data?.currentUser;
	$: mutation_currentUserUpdate_Store =
		data.mutation_currentUserUpdate_Store as Mutation_currentUserUpdate_Store;
	let errors: Record<string, Errors> = {};

	const mutation = (args: UserInput) => {
		validate('Mutation_currentUserUpdate_Arguments', { userInput: args })
			.then((data) => {
				errors = {};
				mutation_currentUserUpdate_Store.fetch({ userInput: args }).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						ot();
					}
				});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};
</script>

<Card>
	<CardBody>
		<CurrentUserForm
			showBackButton={$canBack}
			bind:value={node}
			{errors}
			isFetching={$query_currentUser_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
