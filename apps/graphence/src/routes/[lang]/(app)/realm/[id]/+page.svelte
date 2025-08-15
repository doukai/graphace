<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import type { Query_realm_Store } from '~/lib/stores/query/query_realm_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { MutationRealmArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_realm_Store = data.query_realm_Store as Query_realm_Store;
	$: node = $query_realm_Store.response.data?.realm;
	$: mutation_realm_Store = data.mutation_realm_Store as Mutation_realm_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const mutation = (args: MutationRealmArgs) => {
		validate('Mutation_realm_Arguments', args)
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
				console.error(validErrors);
				errors = validErrors;
			});
	};
</script>

<Card>
	<CardBody>
		<RealmForm
			showSaveButton={auth('Realm::*::WRITE')}
			showRemoveButton={auth('Realm::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_realm_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_realm_Store.isFetching}
			fields={{
				name: {
					readonly: !auth('Realm::name::WRITE'),
					disabled: !auth('Realm::name::WRITE'),
					hidden: !auth('Realm::name::READ')
				},
				description: {
					readonly: !auth('Realm::description::WRITE'),
					disabled: !auth('Realm::description::WRITE'),
					hidden: !auth('Realm::description::READ')
				}
			}}
			on:save={(e) => {
				if (e.detail.value) {
					mutation(e.detail.value);
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					modal.open({
						title: $LL.graphence.components.modal.removeModalTitle(),
						confirm: () => {
							mutation({
								where: { id: { val: e.detail.value?.id } },
								isDeprecated: true
							});
							return true;
						}
					});
				}
			}}
			on:goto={(e) => to(`/${$locale}/realm/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
