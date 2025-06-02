<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { Query_role_Store } from '~/lib/stores/query/query_role_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { MutationRoleArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_role_Store = data.query_role_Store as Query_role_Store;
	$: node = $query_role_Store.response.data?.role;
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;

	let value = {};
	let errors: Record<string, Errors> = {};
	let validating = false;

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const mutation = (args: MutationRoleArgs) => {
		validating = true;
		validate('Mutation_role_Arguments', args, $locale)
			.then((data) => {
				validating = false;
				errors = {};
				mutation_role_Store.fetch(args).then((result) => {
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
</script>

<Card>
	<CardBody>
		<RoleForm
			showSaveButton
			showRemoveButton
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_role_Store.isFetching}
			isMutating={validating || $mutation_role_Store.isFetching}
			fields={{
				name: {
					readonly: !permissions.auth('Role::name::WRITE'),
					disabled: !permissions.auth('Role::name::WRITE'),
					hidden: !permissions.auth('Role::name::READ')
				},
				description: {
					readonly: !permissions.auth('Role::description::WRITE'),
					disabled: !permissions.auth('Role::description::WRITE'),
					hidden: !permissions.auth('Role::description::READ')
				},
				users: {
					readonly: !permissions.auth('Role::users::WRITE'),
					disabled: !permissions.auth('Role::users::WRITE'),
					hidden: !permissions.auth('Role::users::READ')
				},
				groups: {
					readonly: !permissions.auth('Role::groups::WRITE'),
					disabled: !permissions.auth('Role::groups::WRITE'),
					hidden: !permissions.auth('Role::groups::READ')
				},
				composites: {
					readonly: !permissions.auth('Role::composites::WRITE'),
					disabled: !permissions.auth('Role::composites::WRITE'),
					hidden: !permissions.auth('Role::composites::READ')
				},
				permissions: {
					readonly: !permissions.auth('Role::permissions::WRITE'),
					disabled: !permissions.auth('Role::permissions::WRITE'),
					hidden: !permissions.auth('Role::permissions::READ')
				},
				realm: {
					readonly: !permissions.auth('Role::realm::WRITE'),
					disabled: !permissions.auth('Role::realm::WRITE'),
					hidden: !permissions.auth('Role::realm::READ')
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
			on:goto={(e) => to(e.detail.path, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
