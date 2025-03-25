<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, add, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import type { Query_user_rolesConnection_Store } from '~/lib/stores/query/query_user_rolesConnection_store';
	import type { Mutation_user_roles_Store } from '~/lib/stores/mutation/mutation_user_roles_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { RoleInput, MutationRoleArgs, QueryRoleConnectionArgs } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_user_rolesConnection_Store = data.query_user_rolesConnection_Store as Query_user_rolesConnection_Store;
	$: user = $query_user_rolesConnection_Store.response.data?.user;
	$: nodes = $query_user_rolesConnection_Store.response.data?.user?.rolesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_user_rolesConnection_Store.response.data?.user?.rolesConnection?.totalCount || 0;
	$: mutation_user_roles_Store = data.mutation_user_roles_Store as Mutation_user_roles_Store;
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (args: QueryRoleConnectionArgs) => {
		query_user_rolesConnection_Store.fetch({ user_id: user?.id, ...args }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationRoleArgs) => {
		validate('Mutation_role_Arguments', args, $locale)
			.then((data) => {
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
				errors = validErrors;
			});
	};

	const merge = (args: RoleInput[]) => {
		validate('Mutation_user_Arguments', { where: { id: { val: user?.id } }, roles: args }, $locale)
			.then((data) => {
				errors = {};
				mutation_user_roles_Store.fetch({
					user_id: user?.id,
					user_roles: args
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
				errors = validErrors.roles.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<RoleTable
			showUnbindButton={true}
			showEditButton={true}
			showCreateButton={true}
			showBackButton={$canBack}
			value={nodes}
			{errors}
			isFetching={$query_user_rolesConnection_Store.isFetching}
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
			on:search={(e) => {
				if (e.detail.value) {
					query({
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
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
					to(`./user/${e.detail.value.id}`);
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
			on:create={(e) => to('./roles/_')}
			on:goto={(e) => {
				if (Array.isArray(e.detail.path)) {
					add(`./roles/${e.detail.path[0].path}`, e.detail.path[0].name);
					to(`./roles/${e.detail.path[1].path}`, e.detail.path[1].name);
				}
			}}
			on:back={(e) => ot()}
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
