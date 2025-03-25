<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { Query_permission_Store } from '~/lib/stores/query/query_permission_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { MutationPermissionArgs } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_permission_Store = data.query_permission_Store as Query_permission_Store;
	$: node = $query_permission_Store.response.data?.permission;
	$: mutation_permission_Store = data.mutation_permission_Store as Mutation_permission_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const mutation = (args: MutationPermissionArgs) => {
		validate('Mutation_permission_Arguments', args, $locale)
			.then((data) => {
				errors = {};
				mutation_permission_Store.fetch(args).then((result) => {
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
		<PermissionForm
			showSaveButton={true}
			showRemoveButton={true}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_permission_Store.isFetching}
			fields={{
				name: {
					readonly: !permissions.auth('Permission::name::WRITE'),
					disabled: !permissions.auth('Permission::name::WRITE'),
					hidden: !permissions.auth('Permission::name::READ')
				},
				description: {
					readonly: !permissions.auth('Permission::description::WRITE'),
					disabled: !permissions.auth('Permission::description::WRITE'),
					hidden: !permissions.auth('Permission::description::READ')
				},
				field: {
					readonly: !permissions.auth('Permission::field::WRITE'),
					disabled: !permissions.auth('Permission::field::WRITE'),
					hidden: !permissions.auth('Permission::field::READ')
				},
				type: {
					readonly: !permissions.auth('Permission::type::WRITE'),
					disabled: !permissions.auth('Permission::type::WRITE'),
					hidden: !permissions.auth('Permission::type::READ')
				},
				permissionType: {
					readonly: !permissions.auth('Permission::permissionType::WRITE'),
					disabled: !permissions.auth('Permission::permissionType::WRITE'),
					hidden: !permissions.auth('Permission::permissionType::READ')
				},
				roles: {
					readonly: !permissions.auth('Permission::roles::WRITE'),
					disabled: !permissions.auth('Permission::roles::WRITE'),
					hidden: !permissions.auth('Permission::roles::READ')
				},
				realm: {
					readonly: !permissions.auth('Permission::realm::WRITE'),
					disabled: !permissions.auth('Permission::realm::WRITE'),
					hidden: !permissions.auth('Permission::realm::READ')
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
			on:goto={(e) => to(`./${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
