<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { Mutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { PermissionInput } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id as string;
	$: mutation_role_permissions_Store = data.mutation_role_permissions_Store as Mutation_role_permissions_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (args: PermissionInput) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id } }, permissions: [args] })
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
				console.error(validErrors);
				errors = validErrors.permissions?.iterms[0]?.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<PermissionForm
			showSaveButton
			showBackButton={$canBack}
			bind:value
			{errors}
			isMutating={$validator.isValidating || $mutation_role_permissions_Store.isFetching}
			fields={{
				name: {
					readonly: !auth('Permission::name::WRITE'),
					disabled: !auth('Permission::name::WRITE'),
					hidden: !auth('Permission::name::READ')
				},
				description: {
					readonly: !auth('Permission::description::WRITE'),
					disabled: !auth('Permission::description::WRITE'),
					hidden: !auth('Permission::description::READ')
				},
				field: {
					readonly: !auth('Permission::field::WRITE'),
					disabled: !auth('Permission::field::WRITE'),
					hidden: !auth('Permission::field::READ')
				},
				type: {
					readonly: !auth('Permission::type::WRITE'),
					disabled: !auth('Permission::type::WRITE'),
					hidden: !auth('Permission::type::READ')
				},
				permissionType: {
					readonly: !auth('Permission::permissionType::WRITE'),
					disabled: !auth('Permission::permissionType::WRITE'),
					hidden: !auth('Permission::permissionType::READ')
				},
				roles: {
					readonly: !auth('Permission::roles::WRITE'),
					disabled: !auth('Permission::roles::WRITE'),
					hidden: !auth('Permission::roles::READ')
				},
				realm: {
					readonly: !auth('Permission::realm::WRITE'),
					disabled: !auth('Permission::realm::WRITE'),
					hidden: !auth('Permission::realm::READ')
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
