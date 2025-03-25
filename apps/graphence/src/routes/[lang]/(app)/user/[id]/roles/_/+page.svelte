<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { Mutation_user_roles_Store } from '~/lib/stores/mutation/mutation_user_roles_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { RoleInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: id = data.id as string;
	$: mutation_user_roles_Store = data.mutation_user_roles_Store as Mutation_user_roles_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (args: RoleInput) => {
		validate('Mutation_user_Arguments', { where: { id: { val: id } }, roles: [args] }, $locale)
			.then((data) => {
				errors = {};
				mutation_user_roles_Store.fetch({
					user_id: id,
					user_roles: [args]
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
				errors = validErrors.roles?.iterms[0]?.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<RoleForm
			showSaveButton={true}
			showBackButton={$canBack}
			bind:value
			{errors}
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
					merge(e.detail.value);
				}
			}}
			on:goto={(e) => to(`../../../${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
