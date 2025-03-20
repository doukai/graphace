<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import RealmForm from '~//realm/RealmForm.svelte';
	import type { Query_user_realm_Store } from '~/lib/stores/query/query_user_realm_store';
	import type { Mutation_user_realm_Store } from '~/lib/stores/mutation/mutation_user_realm_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { RealmInput, MutationRealmArgs } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_user_realm_Store = data.query_user_realm_Store as Query_user_realm_Store;
	$: user = $query_user_realm_Store.response.data?.user;
	$: node = user?.realm;
	$: mutation_user_realm_Store = data.mutation_user_realm_Store as Mutation_user_realm_Store;
	$: mutation_realm_Store = data.mutation_realm_Store as Mutation_realm_Store;
	$: errors = data.errors as Record<string, Errors>;

	const mutation = (args: MutationRealmArgs) => {
		validate('Mutation_realm_Arguments', args, $locale)
			.then((data) => {
				errors = {};
				mutation_realm_Store.fetch(args).then((result) => {
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

	const parentMutation = (args: MutationRealmArgs | null) => {
		validate('Mutation_user_Arguments', { where: { id: { val: user?.id } }, realm: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_user_realm_Store.fetch({
					user_id: user?.id,
					user_realm: args
				}).then((result) => {
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
				errors = validErrors.realm.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<RealmForm
			showGotoSelectButton={true}
			{node}
			{errors}
			showRemoveButton={false}
			showUnbindButton={true}
			showBackButton={$canBack}
			isFetching={$query_user_realm_Store.isFetching}
			on:mutation={mutation}
			on:parentMutation={parentMutation}
			on:gotoField={gotoField}
			on:gotoSelect={gotoSelect}
			on:back={back}
		/>
	</CardBody>
</Card>