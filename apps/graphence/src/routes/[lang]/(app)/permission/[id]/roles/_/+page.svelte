<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { Mutation_permission_roles_Store } from '~/lib/stores/mutation/mutation_permission_roles_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { RoleInput } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id as string;
	$: mutation_permission_roles_Store = data.mutation_permission_roles_Store as Mutation_permission_roles_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (args: RoleInput) => {
		validate('Mutation_permission_Arguments', { where: { id: { val: id } }, roles: [args] })
			.then((data) => {
				errors = {};
				mutation_permission_roles_Store.fetch({
					permission_id: id,
					permission_roles: [args]
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
				errors = validErrors.roles?.iterms[0]?.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<RoleForm
			showSaveButton
			showBackButton={$canBack}
			bind:value
			{errors}
			isMutating={$validator.isValidating || $mutation_permission_roles_Store.isFetching}
			fields={{
				name: {
					readonly: !auth('Role::name::WRITE'),
					disabled: !auth('Role::name::WRITE'),
					hidden: !auth('Role::name::READ')
				},
				description: {
					readonly: !auth('Role::description::WRITE'),
					disabled: !auth('Role::description::WRITE'),
					hidden: !auth('Role::description::READ')
				},
				users: {
					readonly: !auth('Role::users::WRITE'),
					disabled: !auth('Role::users::WRITE'),
					hidden: !auth('Role::users::READ')
				},
				groups: {
					readonly: !auth('Role::groups::WRITE'),
					disabled: !auth('Role::groups::WRITE'),
					hidden: !auth('Role::groups::READ')
				},
				composites: {
					readonly: !auth('Role::composites::WRITE'),
					disabled: !auth('Role::composites::WRITE'),
					hidden: !auth('Role::composites::READ')
				},
				permissions: {
					readonly: !auth('Role::permissions::WRITE'),
					disabled: !auth('Role::permissions::WRITE'),
					hidden: !auth('Role::permissions::READ')
				},
				realm: {
					readonly: !auth('Role::realm::WRITE'),
					disabled: !auth('Role::realm::WRITE'),
					hidden: !auth('Role::realm::READ')
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
