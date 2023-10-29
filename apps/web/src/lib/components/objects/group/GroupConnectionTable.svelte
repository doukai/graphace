<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, Pagination, messageBoxs, notifications } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Group,
		GroupOrderBy,
		QueryGroupConnectionArgs,
		GroupInput
	} from '~/lib/types/schema';
	import { auth } from '@graphace/common';

	export let nodes: (Group | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryGroupConnectionArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: GroupInput;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: GroupInput[];
			then: (data: Group[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (Group | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	export let args: QueryGroupConnectionArgs = {};
	export let orderBy: GroupOrderBy = {};
	export let after: string | undefined = undefined;
	export let before: string | undefined = undefined;
	export let pageNumber: number = 1;
	export let pageSize: number = 10;

	let selectAll: boolean;
	export let selectedIdList: (string | null)[] = [];

	export const query = () => {
		pageNumber = 1;
		queryPage();
	};

	export const queryPage = () => {
		if (Object.keys(orderBy).length > 0) {
			args.orderBy = orderBy;
		} else {
			args.orderBy = undefined;
		}

		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else {
			args.offset = (pageNumber - 1) * pageSize;
			args.first = pageSize;
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			}
		});
	};

	export const search = (searchValue: string | undefined) => {
		let args: QueryGroupConnectionArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
		}
		
		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else {
			args.offset = (pageNumber - 1) * pageSize;
			args.first = pageSize;
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			}
		});
	};

	const updateField = (args: GroupInput | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					notifications.success($LL.web.message.saveSuccess());
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			});
		}
	};

	const removeRow = (id: string) => {
		dispatch('mutation', {
			args: { where: { id: { val: id } }, isDeprecated: true },
			then: (data) => {
				notifications.success($LL.web.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.removeFailed());
			}
		});
	};

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: 'IN', in: selectedIdList } },
				isDeprecated: true
			},
			then: (data) => {
				notifications.success($LL.web.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.removeFailed());
			}
		});
	};

	const unbindRows = (selectedIdList: (string | null)[]) => {
		dispatch('parentMutation', {
			args: selectedIdList
				.map((id) => nodes?.find((node) => node?.id === id))
				.map((node) => {
					return { ...node, isDeprecated: true };
				}),
			then: (data) => {
				notifications.success($LL.web.message.unbindSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.unbindFailed());
			}
		});
	};
</script>

<TableHead
	title={$LL.graphql.objects.Group.name()}
	showRemoveButton={auth('Group::*::WRITE') && showRemoveButton && selectedIdList.length > 0}
	showUnbindButton={auth('Group::*::WRITE') && showUnbindButton && selectedIdList.length > 0}
	showSaveButton={auth('Group::*::WRITE') && showSaveButton}
	showGotoSelectButton={auth('Group::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:create
	on:search={(e) => search(e.detail.value)}
	on:save={(e) => dispatch('save', { nodes })}
	on:remove={(e) => {
		messageBoxs.open({
			title: $LL.web.components.table.removeModalTitle(),
			buttonName: $LL.web.components.table.removeBtn(),
			buttonType: 'error',
			confirm: () => {
				removeRows();
				return true;
			}
		});
	}}
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.web.components.table.unbindModalTitle(),
			buttonName: $LL.web.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbindRows(selectedIdList);
				return true;
			},
			button1: {
				name: $LL.web.components.table.removeBtn(),
				className: 'btn-error',
				onClick: () => {
					removeRows();
					return true;
				}
			}
		})}
	on:gotoSelect
	on:back
/>
<div class="divider" />
<Table>
	<thead>
		<tr class="z-20">
			<th class="w-12">
				<label>
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={selectAll}
						on:change={(e) => {
							if (nodes && nodes.length > 0) {
								selectedIdList = selectAll ? nodes.map((node) => node?.id || null) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if auth('Group::name::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Group::parent::*')}
			<GroupTh
				name={$LL.graphql.objects.Group.fields.parent.name()}
				bind:expression={args.parent}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Group::subGroups::*')}
			<GroupTh
				name={$LL.graphql.objects.Group.fields.subGroups.name()}
				bind:expression={args.subGroups}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Group::users::*')}
			<UserTh
				name={$LL.graphql.objects.Group.fields.users.name()}
				bind:expression={args.users}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Group::roles::*')}
			<RoleTh
				name={$LL.graphql.objects.Group.fields.roles.name()}
				bind:expression={args.roles}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Group::realm::*')}
			<RealmTh
				name={$LL.graphql.objects.Group.fields.realm.name()}
				bind:expression={args.realm}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Group::*::WRITE')}
			<th />
			{/if}
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={pageSize} cols={6 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.id} />
								</label>
							</th>
							{#if auth('Group::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } })}
								readonly={!auth('Group::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if auth('Group::parent::*')}
							<ObjectTd name="parent" errors={errors[row]?.iterms?.parent} path={`${node.id}/parent`} on:gotoField />
							{/if}
							{#if auth('Group::subGroups::*')}
							<ObjectTd name="subGroups" errors={errors[row]?.iterms?.subGroups} path={`${node.id}/sub-groups`} on:gotoField />
							{/if}
							{#if auth('Group::users::*')}
							<ObjectTd name="users" errors={errors[row]?.iterms?.users} path={`${node.id}/users`} on:gotoField />
							{/if}
							{#if auth('Group::roles::*')}
							<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path={`${node.id}/roles`} on:gotoField />
							{/if}
							{#if auth('Group::realm::*')}
							<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
							{/if}
							{#if auth('Group::*::WRITE')}
							<th class="z-10 hover:z-30 w-24">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('edit', { id: node.id });
												}
											}}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
									{#if showUnbindButton}
										<div class="tooltip" data-tip={$LL.web.components.table.unbindBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.web.components.table.unbindModalTitle(),
														buttonName: $LL.web.components.table.unbindBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																unbindRows([node.id]);
															}
															return true;
														},
														button1: {
															name: $LL.web.components.table.removeBtn(),
															className: 'btn-error',
															onClick: () => {
																if (node?.id) {
																	removeRow(node.id);
																}
																return true;
															}
														}
													});
												}}
											>
												<Icon src={ArchiveBoxXMark} solid />
											</button>
										</div>
									{:else}
										<div class="tooltip" data-tip={$LL.web.components.table.removeBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.web.components.table.removeModalTitle(),
														buttonName: $LL.web.components.table.removeBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																removeRow(node.id);
															}
															return true;
														}
													});
												}}
											>
												<Icon src={Trash} solid />
											</button>
										</div>
									{/if}
								</div>
							</th>
							{/if}
						</tr>
					{/if}
				{/each}
			{:else}
				<TableEmpty cols={6 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
<div class="divider" />
<Pagination
	bind:pageNumber
	bind:pageSize
	{totalCount}
	on:pageChange={(e) => queryPage()}
	on:sizeChange={(e) => queryPage()}
/>