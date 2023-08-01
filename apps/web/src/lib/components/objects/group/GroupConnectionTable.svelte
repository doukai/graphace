<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, StringTh, StringTd, BooleanTh, BooleanTd, IntTh, IntTd, TimestampTh, TimestampTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { Pagination } from '@graphace/ui/components/connection';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Group,
		GroupOrderBy,
		QueryTypeGroupConnectionArgs,
		MutationTypeGroupArgs
	} from '~/lib/types/schema';

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
			args: QueryTypeGroupConnectionArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		mutation: {
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		parentMutation: {
			args: MutationTypeGroupArgs[];
			update?: boolean;
			then: (data: Group[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (Group | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let args: QueryTypeGroupConnectionArgs = {};
	let orderBy: GroupOrderBy = {};
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
		let args: QueryTypeGroupConnectionArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
			args.realmId = { opr: 'LK', val: `%${searchValue}%` };
			args.createUserId = { opr: 'LK', val: `%${searchValue}%` };
			args.updateUserId = { opr: 'LK', val: `%${searchValue}%` };
			args.createGroupId = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
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

	const updateField = (args: MutationTypeGroupArgs | null | undefined) => {
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
		title={$LL.graphql.objects.Group.name()}
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
					name={$LL.graphql.objects.Group.fields.id.name()}
					bind:expression={args.id}
					bind:sort={orderBy.id}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Group.fields.name.name()}
					bind:expression={args.name}
					bind:sort={orderBy.name}
					on:filter={query}
				/>
				<td>{$LL.graphql.objects.Group.fields.users.name()}</td>
				<td>{$LL.graphql.objects.Group.fields.roles.name()}</td>
				<td>{$LL.graphql.objects.Group.fields.realm.name()}</td>
				<td>{$LL.graphql.objects.Group.fields.isDeprecated.name()}</td>
				<IntTh
					name={$LL.graphql.objects.Group.fields.version.name()}
					bind:expression={args.version}
					bind:sort={orderBy.version}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Group.fields.realmId.name()}
					bind:expression={args.realmId}
					bind:sort={orderBy.realmId}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Group.fields.createUserId.name()}
					bind:expression={args.createUserId}
					bind:sort={orderBy.createUserId}
					on:filter={query}
				/>
				<TimestampTh
					name={$LL.graphql.objects.Group.fields.createTime.name()}
					bind:expression={args.createTime}
					bind:sort={orderBy.createTime}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Group.fields.updateUserId.name()}
					bind:expression={args.updateUserId}
					bind:sort={orderBy.updateUserId}
					on:filter={query}
				/>
				<TimestampTh
					name={$LL.graphql.objects.Group.fields.updateTime.name()}
					bind:expression={args.updateTime}
					bind:sort={orderBy.updateTime}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Group.fields.createGroupId.name()}
					bind:expression={args.createGroupId}
					bind:sort={orderBy.createGroupId}
					on:filter={query}
				/>
				<IntTh
					name={$LL.graphql.objects.Group.fields.parentId.name()}
					bind:expression={args.parentId}
					bind:sort={orderBy.parentId}
					on:filter={query}
				/>
				<td>{$LL.graphql.objects.Group.fields.userGroup.name()}</td>
				<td>{$LL.graphql.objects.Group.fields.groupRole.name()}</td>
				<th />
			</tr>
		</thead>
		{#if isFetching}
			<TableLoading rows={pageSize} cols={16 + 2}/>
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
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={() => updateField({ id: node?.id, name: node?.name })}
									errors={errors[row]?.iterms?.name}
								/>
								<ObjectTd name="users" errors={errors[row]?.iterms?.users} path={`${node.id}/users`} on:gotoField />
								<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path={`${node.id}/roles`} on:gotoField />
								<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
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
								<IntTd
									name="parentId"
									bind:value={node.parentId}
									on:save={() => updateField({ id: node?.id, parentId: node?.parentId })}
									errors={errors[row]?.iterms?.parentId}
								/>
								<ObjectTd name="userGroup" errors={errors[row]?.iterms?.userGroup} path={`${node.id}/user-group`} on:gotoField />
								<ObjectTd name="groupRole" errors={errors[row]?.iterms?.groupRole} path={`${node.id}/group-role`} on:gotoField />
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
					<TableEmpty cols={16 + 2}/>
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