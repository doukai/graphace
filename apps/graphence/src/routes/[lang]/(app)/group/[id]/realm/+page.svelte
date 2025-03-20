<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import RealmForm from '~//realm/RealmForm.svelte';
	import type { Query_group_realm_Store } from '~/lib/stores/query/query_group_realm_store';
	import type { Mutation_group_realm_Store } from '~/lib/stores/mutation/mutation_group_realm_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { RealmInput, MutationRealmArgs } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_group_realm_Store = data.query_group_realm_Store as Query_group_realm_Store;
	$: group = $query_group_realm_Store.response.data?.group;
	$: node = group?.realm;
	$: mutation_group_realm_Store = data.mutation_group_realm_Store as Mutation_group_realm_Store;
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
		validate('Mutation_group_Arguments', { where: { id: { val: group?.id } }, realm: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_group_realm_Store.fetch({
					group_id: group?.id,
					group_realm: args
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
			isFetching={$query_group_realm_Store.isFetching}
			on:mutation={mutation}
			on:parentMutation={parentMutation}
			on:gotoField={gotoField}
			on:gotoSelect={gotoSelect}
			on:back={back}
		/>
	</CardBody>
</Card>