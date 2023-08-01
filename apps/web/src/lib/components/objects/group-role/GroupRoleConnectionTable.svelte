<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, IntTh, IntTd, BooleanTh, BooleanTd, StringTh, StringTd, TimestampTh, TimestampTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { Pagination } from '@graphace/ui/components/connection';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		GroupRole,
		GroupRoleOrderBy,
		QueryTypeGroupRoleConnectionArgs,
		MutationTypeGroupRoleArgs
	} from '~/lib/types/schema';

	export let nodes: (GroupRole | null | undefined)[] | null | undefined;
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
			args: QueryTypeGroupRoleConnectionArgs;
			then: (data: (GroupRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		mutation: {
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		parentMutation: {
			args: MutationTypeGroupRoleArgs[];
			update?: boolean;
			then: (data: GroupRole[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (GroupRole | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let args: QueryTypeGroupRoleConnectionArgs = {};
	let orderBy: GroupRoleOrderBy = {};
	let after: string | undefined;
	let before: string | undefined;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	let selectAll: boolean;
	let selectedIdList: (string | null)[] = [];

	const query = () => {
		pageNumber = 1;
		queryPage();
	};

	const queryPage = () => {
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

	const search = (searchValue: string | undefined) => {
		let args: QueryTypeGroupRoleConnectionArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.realmId = { opr: 'LK', val: `%${searchValue}%` };
			args.createUserId = { opr: 'LK', val: `%${searchValue}%` };
			args.updateUserId = { opr: 'LK', val: `%${searchValue}%` };
			args.createGroupId = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.realmId = undefined;
			args.createUserId = undefined;
			args.updateUserId = undefined;
			args.createGroupId = undefined;
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

	const updateField = (args: MutationTypeGroupRoleArgs | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
				update: true,
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
			args: { id: id, isDeprecated: true },
			update: true,
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
			update: true,
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
			update: true,
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

<Card>
	<TableHead
		title={$LL.graphql.objects.GroupRole.name()}
		showRemoveButton={showRemoveButton && selectedIdList.length > 0}
		showUnbindButton={showUnbindButton && selectedIdList.length > 0}
		{showSaveButton}
		{showGotoSelectButton}
		{showBackButton}
		on:create
		on:search={(e) => search(e.detail.value)}
		on:save={() => dispatch('save', { nodes })}
		on:remove={() => {
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
		on:unbind={() =>
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
			<tr>
				<th class="z-10 w-12">
					<label>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={selectAll}
							on:change={() => {
								if (nodes && nodes.length > 0) {
									selectedIdList = selectAll ? nodes.map((node) => node?.id || null) : [];
								}
							}}
						/>
					</label>
				</th>
				<IDTh
					name={$LL.graphql.objects.GroupRole.fields.id.name()}
					bind:expression={args.id}
					bind:sort={orderBy.id}
					on:filter={query}
				/>
				<IntTh
					name={$LL.graphql.objects.GroupRole.fields.groupId.name()}
					bind:expression={args.groupId}
					bind:sort={orderBy.groupId}
					on:filter={query}
				/>
				<td>{$LL.graphql.objects.GroupRole.fields.from.name()}</td>
				<IntTh
					name={$LL.graphql.objects.GroupRole.fields.roleId.name()}
					bind:expression={args.roleId}
					bind:sort={orderBy.roleId}
					on:filter={query}
				/>
				<td>{$LL.graphql.objects.GroupRole.fields.to.name()}</td>
				<td>{$LL.graphql.objects.GroupRole.fields.isDeprecated.name()}</td>
				<IntTh
					name={$LL.graphql.objects.GroupRole.fields.version.name()}
					bind:expression={args.version}
					bind:sort={orderBy.version}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.GroupRole.fields.realmId.name()}
					bind:expression={args.realmId}
					bind:sort={orderBy.realmId}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.GroupRole.fields.createUserId.name()}
					bind:expression={args.createUserId}
					bind:sort={orderBy.createUserId}
					on:filter={query}
				/>
				<TimestampTh
					name={$LL.graphql.objects.GroupRole.fields.createTime.name()}
					bind:expression={args.createTime}
					bind:sort={orderBy.createTime}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.GroupRole.fields.updateUserId.name()}
					bind:expression={args.updateUserId}
					bind:sort={orderBy.updateUserId}
					on:filter={query}
				/>
				<TimestampTh
					name={$LL.graphql.objects.GroupRole.fields.updateTime.name()}
					bind:expression={args.updateTime}
					bind:sort={orderBy.updateTime}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.GroupRole.fields.createGroupId.name()}
					bind:expression={args.createGroupId}
					bind:sort={orderBy.createGroupId}
					on:filter={query}
				/>
				<th />
			</tr>
		</thead>
		{#if isFetching}
			<TableLoading rows={pageSize} cols={13 + 2}/>
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
								<IDTd
									name="id"
									bind:value={node.id}
									readonly
									errors={errors[row]?.iterms?.id}
								/>
								<IntTd
									name="groupId"
									bind:value={node.groupId}
									on:save={() => updateField({ id: node?.id, groupId: node?.groupId })}
									errors={errors[row]?.iterms?.groupId}
								/>
								<ObjectTd name="from" errors={errors[row]?.iterms?.from} path={`${node.id}/from`} on:gotoField />
								<IntTd
									name="roleId"
									bind:value={node.roleId}
									on:save={() => updateField({ id: node?.id, roleId: node?.roleId })}
									errors={errors[row]?.iterms?.roleId}
								/>
								<ObjectTd name="to" errors={errors[row]?.iterms?.to} path={`${node.id}/to`} on:gotoField />
								<BooleanTd
									name="isDeprecated"
									bind:value={node.isDeprecated}
									on:save={() => updateField({ id: node?.id, isDeprecated: node?.isDeprecated })}
									errors={errors[row]?.iterms?.isDeprecated}
								/>
								<IntTd
									name="version"
									bind:value={node.version}
									on:save={() => updateField({ id: node?.id, version: node?.version })}
									errors={errors[row]?.iterms?.version}
								/>
								<StringTd
									name="realmId"
									bind:value={node.realmId}
									on:save={() => updateField({ id: node?.id, realmId: node?.realmId })}
									errors={errors[row]?.iterms?.realmId}
								/>
								<StringTd
									name="createUserId"
									bind:value={node.createUserId}
									on:save={() => updateField({ id: node?.id, createUserId: node?.createUserId })}
									errors={errors[row]?.iterms?.createUserId}
								/>
								<TimestampTd
									name="createTime"
									bind:value={node.createTime}
									on:save={() => updateField({ id: node?.id, createTime: node?.createTime })}
									errors={errors[row]?.iterms?.createTime}
								/>
								<StringTd
									name="updateUserId"
									bind:value={node.updateUserId}
									on:save={() => updateField({ id: node?.id, updateUserId: node?.updateUserId })}
									errors={errors[row]?.iterms?.updateUserId}
								/>
								<TimestampTd
									name="updateTime"
									bind:value={node.updateTime}
									on:save={() => updateField({ id: node?.id, updateTime: node?.updateTime })}
									errors={errors[row]?.iterms?.updateTime}
								/>
								<StringTd
									name="createGroupId"
									bind:value={node.createGroupId}
									on:save={() => updateField({ id: node?.id, createGroupId: node?.createGroupId })}
									errors={errors[row]?.iterms?.createGroupId}
								/>
								<th class="z-10 w-24">
									<div class="flex space-x-1">
										<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click={(e) => {
													e.preventDefault();
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
													on:click={(e) => {
														e.preventDefault();
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
													on:click={(e) => {
														e.preventDefault();
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
							</tr>
						{/if}
					{/each}
				{:else}
					<TableEmpty cols={13 + 2}/>
				{/if}
			</tbody>
		{/if}
	</Table>
	<div class="divider" />
	<Pagination
		bind:pageNumber
		bind:pageSize
		{totalCount}
		on:pageChange={queryPage}
		on:sizeChange={queryPage}
	/>
</Card>