<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { buildArguments, merge } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, Breadcrumbs, toast, modal } from '@graphace/ui';
	import type { FetchParams } from '@graphace/ui-graphql';
	import GroupTable from '~/lib/components/objects/group/GroupTable.svelte';
	import GroupTableDialog from '~/lib/components/objects/group/GroupTableDialog.svelte';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { GroupInput, MutationGroupArgs, QueryGroupConnectionArgs, GroupOrderBy } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id as string;
	$: query_user_groupsConnection_Store = data.query_user_groupsConnection_Store;
	$: user = $query_user_groupsConnection_Store.response.data?.user;
	$: nodes = $query_user_groupsConnection_Store.response.data?.user?.groupsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_user_groupsConnection_Store.response.data?.user?.groupsConnection?.totalCount || 0;
	$: mutation_user_groups_Store = data.mutation_user_groups_Store;
	$: mutation_group_Store = data.mutation_group_Store;

	let value: (GroupInput | null | undefined)[] = [];
	$: if (nodes && nodes.length > 0) {
		value = nodes;
	} else {
		value = [];
	}
	let args: QueryGroupConnectionArgs = {};
	let orderBy: GroupOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined, params?: FetchParams | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_user_groupsConnection_Store
			.fetch({ user_id: id, ...buildArguments(args) }, params)
			.then((result) => {
				if (result.errors) {
					console.error(errors);
					toast.error($LL.graphence.message.requestFailed());
				} else {
					errors = {};
				}
			});
	};

	const mutation = (args: MutationGroupArgs, params?: FetchParams | undefined) => {
		validate('Mutation_group_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_group_Store.fetch(args, params).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors, data);
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

	const mutation_groups = (input: GroupInput[], params?: FetchParams | undefined) => {
		validate('Mutation_user_Arguments', { where: { id: { val: user?.id } }, groups: input })
			.then((data) => {
				errors = {};
				mutation_user_groups_Store
					.fetch(
						{
							user_id: id,
							user_groups: input
						},
						{ directives: [merge()], ...params }
					)
					.then((result) => {
						if (result.errors) {
							console.error(result.errors);
							errors = buildGraphQLErrors(result.errors, data);
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
				errors = validErrors.groups.iterms;
			});
	};
</script>

<Breadcrumbs>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/user`)}>
			<span class="badge badge-outline">{$LL.graphql.objects.User.name()}</span>
		</a>
	</li>
	<li>
		<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/user/${user?.id}`)}>
			<span class="badge badge-outline">{$LL.graphence.path.edit({ name: $LL.graphql.objects.User.name() })}</span>
		</a>
	</li>
	<li>
		<span class="badge badge-neutral">{$LL.graphql.objects.User.fields.groups.name()}</span>
	</li>
</Breadcrumbs>
<Card class="flex flex-col max-w-full min-h-0">
	<CardBody class="flex-1 min-h-0">
		<GroupTable
			showUnbindButton={auth('Group::isDeprecated::WRITE')}
			showEditButton
			showCreateButton={auth('Group::*::WRITE')}
			showBackButton={$canBack}
			showSearchInput
			showFilter
			{value}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_user_groupsConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_user_groups_Store.isFetching || $mutation_group_Store.isFetching}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						path: { opr: 'LK', val: e.detail.value },
						parentId: { opr: 'LK', val: e.detail.value },
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
					to(`/${$locale}/group/${e.detail.value.id}`);
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
							mutation_groups(
								e.detail.value.map((node) => ({
									where: { id: { val: node?.id } },
									isDeprecated: true
								}))
							);
						}
						return true;
					}
				});
			}}
			on:create={(e) => to(`/${$locale}/user/${user?.id}/groups/_`)}
			on:goto={(e) => to(`/${$locale}/group/${e.detail.path}`)}
			on:back={(e) => ot()}
		>
			{#if auth('Group::*::WRITE')}
				<GroupTableDialog
					args={{ exs: [{ not: true, users: { id: { val: user?.id } } }] }}
					class="btn-accent"
					on:select={(e) => {
						if (Array.isArray(e.detail.value)) {
							mutation_groups(e.detail.value.filter((item) => item != null));
						}
					}}
				>
					<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
				</GroupTableDialog>
			{/if}
		</GroupTable>
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</CardBody>
</Card>
