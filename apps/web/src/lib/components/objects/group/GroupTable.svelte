<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, StringTh, StringTd, TimestampTh, TimestampTd, IDTh, IDTd, BooleanTh, BooleanTd, IntTh, IntTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import {
		Conditional,
		Operator,
		Group,
		GroupOrderBy,
		QueryTypeGroupListArgs,
		MutationTypeGroupArgs
	} from '~/lib/types/schema';

	export let nodes: (Group | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeGroupListArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		mutation: {
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (Group | null | undefined)[] | null | undefined };
		back: {};
	}>();

	let showRemoveButton = false;
	let args: QueryTypeGroupListArgs = {};
	let orderBy: GroupOrderBy = {};

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
			then: (data) => {},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	const search = (searchValue: string | undefined) => {
		let args: QueryTypeGroupListArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
			args.createGroupId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.name = { opr: Operator.LK, val: `%${searchValue}%` };
			args.realmId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.createGroupId = undefined;
			args.createUserId = undefined;
			args.name = undefined;
			args.realmId = undefined;
			args.updateUserId = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	const updateField = (args: MutationTypeGroupArgs | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					notifications.success($LL.message.saveSuccess());
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.saveFailed());
				}
			});
		}
	}

	const removeRow = (id: string) => {
		dispatch('mutation', {
			args: { id: id, isDeprecated: true },
			update: true,
			then: (data) => {
				notifications.success($LL.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.message.removeFailed());
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
				notifications.success($LL.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.message.removeFailed());
			}
		});
	};
</script>

<Card>
	<TableHead
		title="Group"
		{showRemoveButton}
		on:create
		on:search={(e) => search(e.detail.value)}
		on:save={() => dispatch('save', { nodes })}
		on:removeRows={() => {
			messageBoxs.open({
				title: $LL.components.graphql.table.removeModalTitle(),
				buttonName: $LL.components.graphql.table.removeBtn(),
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
				<StringTh
					name="createGroupId"
					bind:expression={args.createGroupId}
					bind:sort={orderBy.createGroupId}
					on:filter={query}
				/>
				<TimestampTh
					name="createTime"
					bind:expression={args.createTime}
					bind:sort={orderBy.createTime}
					on:filter={query}
				/>
				<StringTh
					name="createUserId"
					bind:expression={args.createUserId}
					bind:sort={orderBy.createUserId}
					on:filter={query}
				/>
				<td>groupRole</td>
				<td>groupRoleConnection</td>
				<IDTh
					name="id"
					bind:expression={args.id}
					bind:sort={orderBy.id}
					on:filter={query}
				/>
				<td>isDeprecated</td>
				<StringTh
					name="name"
					bind:expression={args.name}
					bind:sort={orderBy.name}
					on:filter={query}
				/>
				<IntTh
					name="parentId"
					bind:expression={args.parentId}
					bind:sort={orderBy.parentId}
					on:filter={query}
				/>
				<td>realm</td>
				<StringTh
					name="realmId"
					bind:expression={args.realmId}
					bind:sort={orderBy.realmId}
					on:filter={query}
				/>
				<td>roles</td>
				<td>rolesConnection</td>
				<td>subGroupsConnection</td>
				<TimestampTh
					name="updateTime"
					bind:expression={args.updateTime}
					bind:sort={orderBy.updateTime}
					on:filter={query}
				/>
				<StringTh
					name="updateUserId"
					bind:expression={args.updateUserId}
					bind:sort={orderBy.updateUserId}
					on:filter={query}
				/>
				<td>userGroup</td>
				<td>userGroupConnection</td>
				<td>users</td>
				<td>usersConnection</td>
				<IntTh
					name="version"
					bind:expression={args.version}
					bind:sort={orderBy.version}
					on:filter={query}
				/>
				<th />
			</tr>
		</thead>
		{#if isFetching}
			<TableLoading rows={10} cols={11 + 2}/>
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
								<StringTd
									name="createGroupId"
									bind:value={node.createGroupId}
									on:save={() => updateField({ id: node?.id, createGroupId: node?.createGroupId })}
									errors={errors[row]?.iterms?.createGroupId}
								/>
								<TimestampTd
									name="createTime"
									bind:value={node.createTime}
									on:save={() => updateField({ id: node?.id, createTime: node?.createTime })}
									errors={errors[row]?.iterms?.createTime}
								/>
								<StringTd
									name="createUserId"
									bind:value={node.createUserId}
									on:save={() => updateField({ id: node?.id, createUserId: node?.createUserId })}
									errors={errors[row]?.iterms?.createUserId}
								/>
								<ObjectTd name="groupRole" errors={errors[row]?.iterms?.groupRole} path={`${node.id}/group-role`} on:gotoField />
								<ObjectTd name="groupRoleConnection" errors={errors[row]?.iterms?.groupRoleConnection} path={`${node.id}/group-role-connection`} on:gotoField />
								<IDTd
									name="id"
									bind:value={node.id}
									readonly
									errors={errors[row]?.iterms?.id}
								/>
								<BooleanTd
									name="isDeprecated"
									bind:value={node.isDeprecated}
									on:save={() => updateField({ id: node?.id, isDeprecated: node?.isDeprecated })}
									errors={errors[row]?.iterms?.isDeprecated}
								/>
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={() => updateField({ id: node?.id, name: node?.name })}
									errors={errors[row]?.iterms?.name}
								/>
								<IntTd
									name="parentId"
									bind:value={node.parentId}
									on:save={() => updateField({ id: node?.id, parentId: node?.parentId })}
									errors={errors[row]?.iterms?.parentId}
								/>
								<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
								<StringTd
									name="realmId"
									bind:value={node.realmId}
									on:save={() => updateField({ id: node?.id, realmId: node?.realmId })}
									errors={errors[row]?.iterms?.realmId}
								/>
								<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path={`${node.id}/roles`} on:gotoField />
								<ObjectTd name="rolesConnection" errors={errors[row]?.iterms?.rolesConnection} path={`${node.id}/roles-connection`} on:gotoField />
								<ObjectTd name="subGroupsConnection" errors={errors[row]?.iterms?.subGroupsConnection} path={`${node.id}/sub-groups-connection`} on:gotoField />
								<TimestampTd
									name="updateTime"
									bind:value={node.updateTime}
									on:save={() => updateField({ id: node?.id, updateTime: node?.updateTime })}
									errors={errors[row]?.iterms?.updateTime}
								/>
								<StringTd
									name="updateUserId"
									bind:value={node.updateUserId}
									on:save={() => updateField({ id: node?.id, updateUserId: node?.updateUserId })}
									errors={errors[row]?.iterms?.updateUserId}
								/>
								<ObjectTd name="userGroup" errors={errors[row]?.iterms?.userGroup} path={`${node.id}/user-group`} on:gotoField />
								<ObjectTd name="userGroupConnection" errors={errors[row]?.iterms?.userGroupConnection} path={`${node.id}/user-group-connection`} on:gotoField />
								<ObjectTd name="users" errors={errors[row]?.iterms?.users} path={`${node.id}/users`} on:gotoField />
								<ObjectTd name="usersConnection" errors={errors[row]?.iterms?.usersConnection} path={`${node.id}/users-connection`} on:gotoField />
								<IntTd
									name="version"
									bind:value={node.version}
									on:save={() => updateField({ id: node?.id, version: node?.version })}
									errors={errors[row]?.iterms?.version}
								/>
								<th class="z-10">
									<div class="flex space-x-1">
										<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
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
										<div class="tooltip" data-tip={$LL.components.graphql.table.removeBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click={(e) => {
													e.preventDefault();
													messageBoxs.open({
														title: $LL.components.graphql.table.removeModalTitle(),
														buttonName: $LL.components.graphql.table.removeBtn(),
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
				{/if}
			</tbody>
		{/if}
	</Table>
</Card>
