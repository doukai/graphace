<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { Mutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { PermissionInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: id = data.id as string;
	$: mutation_role_permissions_Store = data.mutation_role_permissions_Store as Mutation_role_permissions_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (args: PermissionInput) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id } }, permissions: [args] }, $locale)
			.then((data) => {
				errors = {};
				mutation_role_permissions_Store.fetch({
					role_id: id,
					role_permissions: [args]
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
				errors = validErrors.permissions?.iterms[0]?.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<PermissionForm
			showSaveButton={true}
			showBackButton={$canBack}
			bind:value
			{errors}
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
					merge(e.detail.value);
				}
			}}
			on:goto={(e) => to(`../../../${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
