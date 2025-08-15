<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import type { Query_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
	import type { Mutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { QueryUserConnectionArgs, UserOrderBy, MutationUserArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_userConnection_Store = data.query_userConnection_Store as Query_userConnection_Store;
	$: nodes = $query_userConnection_Store.response.data?.userConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_userConnection_Store.response.data?.userConnection?.totalCount || 0;
	$: mutation_user_Store = data.mutation_user_Store as Mutation_user_Store;
	let args: QueryUserConnectionArgs = {};
	let orderBy: UserOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_userConnection_Store.fetch(buildArguments(args)).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationUserArgs) => {
		const row = nodes
			?.map((node) => node?.id)
			?.indexOf(args.id || args.where?.id?.val || undefined);
			
		validate('Mutation_user_Arguments', args)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_user_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError,
								confirm: () => {
									query();
									return true;
								}
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						query();
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};
</script>

<Card>
	<CardBody>
		<UserTable
			showRemoveButton={auth('User::isDeprecated::WRITE')}
			showEditButton
			showCreateButton={auth('User::*::WRITE')}
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_userConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_user_Store.isFetching}
			fields={{
				name: {
					readonly: !auth('User::name::WRITE'),
					disabled: !auth('User::name::WRITE'),
					hidden: !auth('User::name::READ')
				},
				description: {
					readonly: !auth('User::description::WRITE'),
					disabled: !auth('User::description::WRITE'),
					hidden: !auth('User::description::READ')
				},
				lastName: {
					readonly: !auth('User::lastName::WRITE'),
					disabled: !auth('User::lastName::WRITE'),
					hidden: !auth('User::lastName::READ')
				},
				login: {
					readonly: !auth('User::login::WRITE'),
					disabled: !auth('User::login::WRITE'),
					hidden: !auth('User::login::READ')
				},
				email: {
					readonly: !auth('User::email::WRITE'),
					disabled: !auth('User::email::WRITE'),
					hidden: !auth('User::email::READ')
				},
				phones: {
					readonly: !auth('User::phones::WRITE'),
					disabled: !auth('User::phones::WRITE'),
					hidden: !auth('User::phones::READ')
				},
				disable: {
					readonly: !auth('User::disable::WRITE'),
					disabled: !auth('User::disable::WRITE'),
					hidden: !auth('User::disable::READ')
				},
				groups: {
					readonly: !auth('User::groups::WRITE'),
					disabled: !auth('User::groups::WRITE'),
					hidden: !auth('User::groups::READ')
				},
				roles: {
					readonly: !auth('User::roles::WRITE'),
					disabled: !auth('User::roles::WRITE'),
					hidden: !auth('User::roles::READ')
				},
				realm: {
					readonly: !auth('User::realm::WRITE'),
					disabled: !auth('User::realm::WRITE'),
					hidden: !auth('User::realm::READ')
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
					to(`/${$locale}/user/${e.detail.value.id}`, e.detail.value.name);
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
			on:create={(e) => to(`/${$locale}/user/_`, '_')}
			on:goto={(e) => to(`/${$locale}/user/${e.detail.path}`, e.detail.name)}
		/>
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
