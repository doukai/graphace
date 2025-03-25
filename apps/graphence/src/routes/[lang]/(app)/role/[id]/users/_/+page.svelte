<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { Mutation_role_users_Store } from '~/lib/stores/mutation/mutation_role_users_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { UserInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: id = data.id as string;
	$: mutation_role_users_Store = data.mutation_role_users_Store as Mutation_role_users_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (args: UserInput) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id } }, users: [args] }, $locale)
			.then((data) => {
				errors = {};
				mutation_role_users_Store.fetch({
					role_id: id,
					role_users: [args]
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
				errors = validErrors.users?.iterms[0]?.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<UserForm
			showSaveButton={true}
			showBackButton={$canBack}
			bind:value
			{errors}
			fields={{
				name: {
					readonly: !permissions.auth('User::name::WRITE'),
					disabled: !permissions.auth('User::name::WRITE'),
					hidden: !permissions.auth('User::name::READ')
				},
				description: {
					readonly: !permissions.auth('User::description::WRITE'),
					disabled: !permissions.auth('User::description::WRITE'),
					hidden: !permissions.auth('User::description::READ')
				},
				lastName: {
					readonly: !permissions.auth('User::lastName::WRITE'),
					disabled: !permissions.auth('User::lastName::WRITE'),
					hidden: !permissions.auth('User::lastName::READ')
				},
				login: {
					readonly: !permissions.auth('User::login::WRITE'),
					disabled: !permissions.auth('User::login::WRITE'),
					hidden: !permissions.auth('User::login::READ')
				},
				email: {
					readonly: !permissions.auth('User::email::WRITE'),
					disabled: !permissions.auth('User::email::WRITE'),
					hidden: !permissions.auth('User::email::READ')
				},
				phones: {
					readonly: !permissions.auth('User::phones::WRITE'),
					disabled: !permissions.auth('User::phones::WRITE'),
					hidden: !permissions.auth('User::phones::READ')
				},
				disable: {
					readonly: !permissions.auth('User::disable::WRITE'),
					disabled: !permissions.auth('User::disable::WRITE'),
					hidden: !permissions.auth('User::disable::READ')
				},
				groups: {
					readonly: !permissions.auth('User::groups::WRITE'),
					disabled: !permissions.auth('User::groups::WRITE'),
					hidden: !permissions.auth('User::groups::READ')
				},
				roles: {
					readonly: !permissions.auth('User::roles::WRITE'),
					disabled: !permissions.auth('User::roles::WRITE'),
					hidden: !permissions.auth('User::roles::READ')
				},
				realm: {
					readonly: !permissions.auth('User::realm::WRITE'),
					disabled: !permissions.auth('User::realm::WRITE'),
					hidden: !permissions.auth('User::realm::READ')
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
