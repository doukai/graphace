<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import type { Query_group_users_Store } from '~/lib/stores/query/query_group_users_store';
	import type { Mutation_group_users_Store } from '~/lib/stores/mutation/mutation_group_users_store';
	import type { Mutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { UserInput, MutationUserArgs, QueryUserConnectionArgs } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_group_users_Store = data.query_group_users_Store as Query_group_users_Store;
	$: group = $query_group_users_Store.response.data?.group;
	$: nodes = $query_group_users_Store.response.data?.group?.usersConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_group_users_Store.response.data?.group?.usersConnection?.totalCount || 0;
	$: mutation_group_users_Store = data.mutation_group_users_Store as Mutation_group_users_Store;
	$: mutation_user_Store = data.mutation_user_Store as Mutation_user_Store;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (args: QueryUserConnectionArgs) => {
		query_group_users_Store.fetch({ group_id: group?.id, ...args }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationUserArgs) => {
		validate('Mutation_user_Arguments', args, $locale)
			.then((data) => {
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
				errors = validErrors;
			});
	};

	const merge = (args: UserInput[]) => {
		validate('Mutation_group_Arguments', { where: { id: { val: group?.id } }, users: args }, $locale)
			.then((data) => {
				errors = {};
				mutation_group_users_Store.fetch({
					group_id: group?.id,
					group_users: args
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
				errors = validErrors.users.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<UserTable
			showUnbindButton={true}
			showEditButton={true}
			showCreateButton={true}
			showBackButton={$canBack}
			value={nodes}
			{errors}
			isFetching={$query_group_users_Store.isFetching}
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
					query({
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						lastName: { opr: 'LK', val: e.detail.value },
						login: { opr: 'LK', val: e.detail.value },
						email: { opr: 'LK', val: e.detail.value },
						phones: { opr: 'LK', val: e.detail.value },
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
					to(`./group/${e.detail.value.id}`);
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
			on:create={(e) => to('./group/_')}
			on:goto={(e) => to(`./group/${e.detail.path}`)}
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
