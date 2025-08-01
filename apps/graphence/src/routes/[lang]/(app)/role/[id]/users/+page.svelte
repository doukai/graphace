<script lang="ts">
	import { getContext } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import UserTableDialog from '~/lib/components/objects/user/UserTableDialog.svelte';
	import type { Query_role_usersConnection_Store } from '~/lib/stores/query/query_role_usersConnection_store';
	import type { Mutation_role_users_Store } from '~/lib/stores/mutation/mutation_role_users_store';
	import type { Mutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { UserInput, MutationUserArgs, QueryUserConnectionArgs, UserOrderBy } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_role_usersConnection_Store = data.query_role_usersConnection_Store as Query_role_usersConnection_Store;
	$: role = $query_role_usersConnection_Store.response.data?.role;
	$: nodes = $query_role_usersConnection_Store.response.data?.role?.usersConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_usersConnection_Store.response.data?.role?.usersConnection?.totalCount || 0;
	$: mutation_role_users_Store = data.mutation_role_users_Store as Mutation_role_users_Store;
	$: mutation_user_Store = data.mutation_user_Store as Mutation_user_Store;
	let args: QueryUserConnectionArgs = {};
	let orderBy: UserOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};
	let validating = false;

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_role_usersConnection_Store.fetch({ role_id: role?.id, ...buildArguments(args) }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationUserArgs) => {
		validating = true;
		validate('Mutation_user_Arguments', args, $locale)
			.then((data) => {
				validating = false;
				errors = {};
				mutation_user_Store.fetch(args).then((result) => {
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
				validating = false;
				console.error(validErrors);
				errors = validErrors;
			});
	};

	const merge = (args: UserInput[]) => {
		validating = true;
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, users: args }, $locale)
			.then((data) => {
				validating = false;
				errors = {};
				mutation_role_users_Store.fetch({
					role_id: role?.id,
					role_users: args
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
				validating = false;
				console.error(validErrors);
				errors = validErrors.users.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<UserTable
			showUnbindButton
			showEditButton
			showCreateButton
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_role_usersConnection_Store.isFetching}
			isMutating={validating || $mutation_role_users_Store.isFetching || $mutation_user_Store.isFetching}
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
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						lastName: { opr: 'LK', val: e.detail.value },
						login: { opr: 'LK', val: e.detail.value },
						email: { opr: 'LK', val: e.detail.value },
						phones: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					};
				} else {
					args = { first: pageSize, offset: 0 };
				}
				query();
			}}
			on:query={(e) => query()}
			on:save={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					mutation(e.detail.value);
				}
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`../../user/${e.detail.value.id}`, e.detail.value.name);
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
			on:create={(e) => to('../../user/_', '_')}
			on:goto={(e) => to(`../../user/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		>
			<UserTableDialog
				args={{ not: true, roles: { id: { val: role?.id } } }}
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
			</UserTableDialog>
		</UserTable>
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
