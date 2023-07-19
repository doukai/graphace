<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, IntTh, IntTd, BooleanTh, BooleanTd, StringTh, StringTd, TimestampTh, TimestampTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import {
		Conditional,
		Operator,
		GroupRole,
		GroupRoleOrderBy,
		QueryTypeGroupRoleListArgs,
		MutationTypeGroupRoleArgs
	} from '~/lib/types/schema';

	export let nodes: (GroupRole | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeGroupRoleListArgs;
			then: (data: (GroupRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		mutation: {
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (GroupRole | null | undefined)[] | null | undefined };
		back: {};
	}>();

	let showRemoveButton = false;
	let args: QueryTypeGroupRoleListArgs = {};
	let orderBy: GroupRoleOrderBy = {};

	let selectAll: boolean;
	let selectedRows: Record<string, boolean> = {};

	$: selectedIdList = Object.keys(selectedRows)
		.filter((id) => selectedRows[id])
		.map((id) => id);

	$: if (selectedIdList.length > 0) {
		showRemoveButton = true;
	} else {
		showRemoveButton = false;
	}

	const query = () => {
		if (Object.keys(orderBy).length > 0) {
			args.orderBy = orderBy;
		} else {
			args.orderBy = undefined;
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
		let args: QueryTypeGroupRoleListArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
			args.realmId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createGroupId = { opr: Operator.LK, val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.realmId = undefined;
			args.createUserId = undefined;
			args.updateUserId = undefined;
			args.createGroupId = undefined;
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
	}

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
	}

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: Operator.IN, in: selectedIdList } },
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
</script>

<Card>
	<TableHead
		title="GroupRole"
		{showRemoveButton}
		{showSaveButton}
		{showBackButton}
		on:create
		on:search={(e) => search(e.detail.value)}
		on:save={() => dispatch('save', { nodes })}
		on:removeRows={() => {
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
		on:back
	/>
	<div class="divider" />
	<Table>
		<thead>
			<tr>
				<th class="z-10">
					<label>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={selectAll}
							on:change={() => {
								if (nodes && nodes.length > 0) {
									nodes.forEach((node) => {
										if (node?.id) {
											selectedRows[node.id] = selectAll;
										}
									});
								}
							}}
						/>
					</label>
				</th>
				<IDTh
					name="id"
					bind:expression={args.id}
					bind:sort={orderBy.id}
					on:filter={query}
				/>
				<IntTh
					name="groupId"
					bind:expression={args.groupId}
					bind:sort={orderBy.groupId}
					on:filter={query}
				/>
				<td>from</td>
				<IntTh
					name="roleId"
					bind:expression={args.roleId}
					bind:sort={orderBy.roleId}
					on:filter={query}
				/>
				<td>to</td>
				<td>isDeprecated</td>
				<IntTh
					name="version"
					bind:expression={args.version}
					bind:sort={orderBy.version}
					on:filter={query}
				/>
				<StringTh
					name="realmId"
					bind:expression={args.realmId}
					bind:sort={orderBy.realmId}
					on:filter={query}
				/>
				<StringTh
					name="createUserId"
					bind:expression={args.createUserId}
					bind:sort={orderBy.createUserId}
					on:filter={query}
				/>
				<TimestampTh
					name="createTime"
					bind:expression={args.createTime}
					bind:sort={orderBy.createTime}
					on:filter={query}
				/>
				<StringTh
					name="updateUserId"
					bind:expression={args.updateUserId}
					bind:sort={orderBy.updateUserId}
					on:filter={query}
				/>
				<TimestampTh
					name="updateTime"
					bind:expression={args.updateTime}
					bind:sort={orderBy.updateTime}
					on:filter={query}
				/>
				<StringTh
					name="createGroupId"
					bind:expression={args.createGroupId}
					bind:sort={orderBy.createGroupId}
					on:filter={query}
				/>
				<th />
			</tr>
		</thead>
		{#if isFetching}
			<TableLoading rows={10} cols={13 + 2}/>
		{:else}
			<tbody>
				{#if nodes && nodes.length > 0}
					{#each nodes as node, row}
						{#if node && node.id}
							<tr class="hover">
								<th class="z-10">
									<label>
										<input type="checkbox" class="checkbox" bind:checked={selectedRows[node.id]} />
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
								<th class="z-10">
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
</Card>
