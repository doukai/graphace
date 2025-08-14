<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import RoleTableDialog from '~/lib/components/objects/role/RoleTableDialog.svelte';
	import type { Query_role_compositesConnection_Store } from '~/lib/stores/query/query_role_compositesConnection_store';
	import type { Mutation_role_composites_Store } from '~/lib/stores/mutation/mutation_role_composites_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { RoleInput, MutationRoleArgs, QueryRoleConnectionArgs, RoleOrderBy } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_role_compositesConnection_Store = data.query_role_compositesConnection_Store as Query_role_compositesConnection_Store;
	$: role = $query_role_compositesConnection_Store.response.data?.role;
	$: nodes = $query_role_compositesConnection_Store.response.data?.role?.compositesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_compositesConnection_Store.response.data?.role?.compositesConnection?.totalCount || 0;
	$: mutation_role_composites_Store = data.mutation_role_composites_Store as Mutation_role_composites_Store;
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;
	let args: QueryRoleConnectionArgs = {};
	let orderBy: RoleOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_role_compositesConnection_Store.fetch({ role_id: role?.id, ...buildArguments(args) }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationRoleArgs) => {
		validate('Mutation_role_Arguments', args)
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
				console.error(validErrors);
				errors = validErrors;
			});
	};

	const merge = (args: RoleInput[]) => {
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, composites: args })
			.then((data) => {
				errors = {};
				mutation_role_composites_Store.fetch({
					role_id: role?.id,
					role_composites: args
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
				errors = validErrors.composites.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<RoleTable
			showUnbindButton
			showEditButton
			showCreateButton
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_role_compositesConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_role_composites_Store.isFetching || $mutation_role_Store.isFetching}
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
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					};
				} else {
					args = { first: pageSize, offset: 0 };
				}
				query();
			}}
			on:query={(e) => {
				args = e.detail.args;
				orderBy = e.detail.orderBy;
				query();
			}}
			on:save={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					mutation(e.detail.value);
				}
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`../../role/${e.detail.value.id}`, e.detail.value.name);
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
			on:create={(e) => to('../../role/_', '_')}
			on:goto={(e) => to(`../../role/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		>
			<RoleTableDialog
				args={{ not: true, composites: { id: { val: role?.id } } }}
				class="btn-accent"
				on:select={(e) => {
					if (Array.isArray(e.detail.value)) {
						merge(e.detail.value);
					} else {
						merge([e.detail.value]);
					}
				}}
			>
				<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
			</RoleTableDialog>
		</RoleTable>
		<div class="divider" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</CardBody>
</Card>
