<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import PermissionTable from '~/lib/components/objects/permission/PermissionTable.svelte';
	import type { Query_role_permissionsConnection_Store } from '~/lib/stores/query/query_role_permissionsConnection_store';
	import type { Mutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { PermissionInput, MutationPermissionArgs, QueryPermissionConnectionArgs } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_role_permissionsConnection_Store = data.query_role_permissionsConnection_Store as Query_role_permissionsConnection_Store;
	$: role = $query_role_permissionsConnection_Store.response.data?.role;
	$: nodes = $query_role_permissionsConnection_Store.response.data?.role?.permissionsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_permissionsConnection_Store.response.data?.role?.permissionsConnection?.totalCount || 0;
	$: mutation_role_permissions_Store = data.mutation_role_permissions_Store as Mutation_role_permissions_Store;
	$: mutation_permission_Store = data.mutation_permission_Store as Mutation_permission_Store;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (args: QueryPermissionConnectionArgs) => {
		query_role_permissionsConnection_Store.fetch({ role_id: role?.id, ...args }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

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

	const merge = (args: PermissionInput[]) => {
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, permissions: args }, $locale)
			.then((data) => {
				errors = {};
				mutation_role_permissions_Store.fetch({
					role_id: role?.id,
					role_permissions: args
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
				errors = validErrors.permissions.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<PermissionTable
			showUnbindButton={true}
			showEditButton={true}
			showCreateButton={true}
			showBackButton={$canBack}
			value={nodes}
			{errors}
			isFetching={$query_role_permissionsConnection_Store.isFetching}
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
			on:search={(e) => {
				if (e.detail.value) {
					query({
						cond: 'OR',
						description: { opr: 'LK', val: e.detail.value },
						field: { opr: 'LK', val: e.detail.value },
						type: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					});
				} else {
					query({ first: pageSize, offset: 0 });
				}
			}}
			on:query={(e) => {
				e.detail.args = buildArguments(e.detail.args);
				if (Object.keys(e.detail.orderBy).length > 0) {
					e.detail.args.orderBy = e.detail.orderBy;
				}
				query(e.detail.args);
			}}
			on:save={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					mutation(e.detail.value);
				}
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`./role/${e.detail.value.id}`);
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					modal.open({
						title: $LL.graphence.components.modal.removeModalTitle(),
						confirm: () => {
							if (Array.isArray(e.detail.value)) {
								mutation({
									where: { id: { opr: 'IN', arr: e.detail.value.map((node) => node?.id) } },
									isDeprecated: true
								});
							} else {
								mutation({
									where: { id: { val: e.detail.value?.id } },
									isDeprecated: true
								});
							}
							return true;
						}
					});
				}
			}}
			on:unbind={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.unbindModalTitle(),
					confirm: () => {
						if (Array.isArray(e.detail.value)) {
							merge(
								e.detail.value.map((node) => ({
									where: { id: { val: node?.id } },
									isDeprecated: true
								}))
							);
						} else {
							merge([
								{
									where: { id: { val: e.detail.value?.id } },
									isDeprecated: true
								}
							]);
						}
						return true;
					}
				});
			}}
			on:create={(e) => to('./permissions/_')}
			on:goto={(e) => to(`./permissions/${e.detail.path}`)}
		/>
		<div class="divider" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query({ first: pageSize, offset: (pageNumber - 1) * pageSize })}
			on:sizeChange={(e) => query({ first: pageSize, offset: 0 })}
		/>
	</CardBody>
</Card>
