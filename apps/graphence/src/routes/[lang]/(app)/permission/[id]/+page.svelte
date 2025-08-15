<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { Query_permission_Store } from '~/lib/stores/query/query_permission_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { MutationPermissionArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_permission_Store = data.query_permission_Store as Query_permission_Store;
	$: node = $query_permission_Store.response.data?.permission;
	$: mutation_permission_Store = data.mutation_permission_Store as Mutation_permission_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const mutation = (args: MutationPermissionArgs) => {
		validate('Mutation_permission_Arguments', args)
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
				console.error(validErrors);
				errors = validErrors;
			});
	};
</script>

<Card>
	<CardBody>
		<PermissionForm
			showSaveButton={auth('Permission::*::WRITE')}
			showRemoveButton={auth('Permission::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_permission_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_permission_Store.isFetching}
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
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
