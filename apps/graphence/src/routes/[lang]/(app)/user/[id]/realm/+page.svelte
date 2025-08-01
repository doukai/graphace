<script lang="ts">
	import { getContext } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import type { Query_user_realm_Store } from '~/lib/stores/query/query_user_realm_store';
	import type { Mutation_user_realm_Store } from '~/lib/stores/mutation/mutation_user_realm_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { RealmInput, MutationRealmArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_user_realm_Store = data.query_user_realm_Store as Query_user_realm_Store;
	$: user = $query_user_realm_Store.response.data?.user;
	$: node = user?.realm;
	$: mutation_user_realm_Store = data.mutation_user_realm_Store as Mutation_user_realm_Store;
	$: mutation_realm_Store = data.mutation_realm_Store as Mutation_realm_Store;

	let value = {};
	let showUnbindButton = false;
	let errors: Record<string, Errors> = {};
	let validating = false;

	$: if (node && Object.keys(node).length > 0) {
		value = node;
		showUnbindButton = true;
	}

	const mutation = (args: MutationRealmArgs) => {
		validating = true;
		validate('Mutation_realm_Arguments', args, $locale)
			.then((data) => {
				validating = false;
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
				validating = false;
				console.error(validErrors);
				errors = validErrors;
			});
	};

	const merge = (args: RealmInput | null) => {
		validating = true;
		validate('Mutation_user_Arguments', { where: { id: { val: user?.id } }, realm: args }, $locale)
			.then((data) => {
				validating = false;
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
				validating = false;
				console.error(validErrors);
				errors = validErrors.realm.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<RealmForm
			showSaveButton
			{showUnbindButton}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_user_realm_Store.isFetching}
			isMutating={validating || $mutation_user_realm_Store.isFetching || $mutation_realm_Store.isFetching}
			fields={{
				name: {
					readonly: !permissions.auth('Realm::name::WRITE'),
					disabled: !permissions.auth('Realm::name::WRITE'),
					hidden: !permissions.auth('Realm::name::READ')
				},
				description: {
					readonly: !permissions.auth('Realm::description::WRITE'),
					disabled: !permissions.auth('Realm::description::WRITE'),
					hidden: !permissions.auth('Realm::description::READ')
				}
			}}
			on:save={(e) => {
				if (e.detail.value) {
					merge(e.detail.value);
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
			on:unbind={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.unbindModalTitle(),
					confirm: () => {
						merge(null);
						return true;
					}
				});
			}}
			on:goto={(e) => to(`../../${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		>
			<RealmTableDialog
				singleChoice
				class="btn-accent"
				on:select={(e) => {
					if (!Array.isArray(e.detail.value)) {
						merge(e.detail.value);
					}
				}}
			>
				<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
			</RealmTableDialog>
		</RealmForm>
	</CardBody>
</Card>