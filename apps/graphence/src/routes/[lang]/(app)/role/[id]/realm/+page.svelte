<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import type { Query_role_realm_Store } from '~/lib/stores/query/query_role_realm_store';
	import type { Mutation_role_realm_Store } from '~/lib/stores/mutation/mutation_role_realm_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { RealmInput, MutationRealmArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_role_realm_Store = data.query_role_realm_Store as Query_role_realm_Store;
	$: role = $query_role_realm_Store.response.data?.role;
	$: node = role?.realm;
	$: mutation_role_realm_Store = data.mutation_role_realm_Store as Mutation_role_realm_Store;
	$: mutation_realm_Store = data.mutation_realm_Store as Mutation_realm_Store;

	let value = {};
	let showUnbindButton = false;
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
		showUnbindButton = true;
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

	const merge = (args: RealmInput | null) => {
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, realm: args })
			.then((data) => {
				errors = {};
				mutation_role_realm_Store.fetch({
					role_id: role?.id,
					role_realm: args
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
				console.error(validErrors);
				errors = validErrors.realm.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<RealmForm
			showSaveButton={auth('Realm::*::WRITE')}
			showUnbindButton={showUnbindButton && auth('Realm::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_role_realm_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_role_realm_Store.isFetching || $mutation_realm_Store.isFetching}
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
			on:goto={(e) => to(`/${$locale}/realm/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		>
			{#if auth('Realm::*::WRITE')}
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
			{/if}
		</RealmForm>
	</CardBody>
</Card>