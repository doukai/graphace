<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, StringTh, StringTd, BooleanTh, BooleanTd, IntTh, IntTd, TimestampTh, TimestampTd } from '@graphace/ui-graphql/components/table';
	import PermissionLevelTh from '~/lib/components/enums/permission-level/PermissionLevelTh.svelte';
	import PermissionLevelTd from '~/lib/components/enums/permission-level/PermissionLevelTd.svelte';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Permission,
		PermissionOrderBy,
		QueryTypePermissionListArgs,
		MutationTypePermissionArgs
	} from '~/lib/types/schema';

	export let nodes: (Permission | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypePermissionListArgs;
			then: (data: (Permission | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		mutation: {
			args: MutationTypePermissionArgs;
			update?: boolean;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		parentMutation: {
			args: MutationTypePermissionArgs[];
			update?: boolean;
			then: (data: Permission[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (Permission | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let args: QueryTypePermissionListArgs = {};
	let orderBy: PermissionOrderBy = {};

	let selectAll: boolean;
	let selectedIdList: (string | null)[] = [];

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
		let args: QueryTypePermissionListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
			args.ofTypeName = { opr: 'LK', val: `%${searchValue}%` };
			args.description = { opr: 'LK', val: `%${searchValue}%` };
			args.realmId = { opr: 'LK', val: `%${searchValue}%` };
			args.createUserId = { opr: 'LK', val: `%${searchValue}%` };
			args.updateUserId = { opr: 'LK', val: `%${searchValue}%` };
			args.createGroupId = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
			args.ofTypeName = undefined;
			args.description = undefined;
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

	const updateField = (args: MutationTypePermissionArgs | null | undefined) => {
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
		title={$LL.graphql.objects.Permission.name()}
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
					name={$LL.graphql.objects.Permission.fields.id.name()}
					bind:expression={args.id}
					bind:sort={orderBy.id}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.name.name()}
					bind:expression={args.name}
					bind:sort={orderBy.name}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.ofTypeName.name()}
					bind:expression={args.ofTypeName}
					bind:sort={orderBy.ofTypeName}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.description.name()}
					bind:expression={args.description}
					bind:sort={orderBy.description}
					on:filter={query}
				/>
				<PermissionLevelTh
					name={$LL.graphql.objects.Permission.fields.level.name()}
					bind:expression={args.level}
					bind:sort={orderBy.level}
					on:filter={query}
				/>
				<td>{$LL.graphql.objects.Permission.fields.role.name()}</td>
				<td>{$LL.graphql.objects.Permission.fields.realm.name()}</td>
				<td>{$LL.graphql.objects.Permission.fields.isDeprecated.name()}</td>
				<IntTh
					name={$LL.graphql.objects.Permission.fields.version.name()}
					bind:expression={args.version}
					bind:sort={orderBy.version}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.realmId.name()}
					bind:expression={args.realmId}
					bind:sort={orderBy.realmId}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.createUserId.name()}
					bind:expression={args.createUserId}
					bind:sort={orderBy.createUserId}
					on:filter={query}
				/>
				<TimestampTh
					name={$LL.graphql.objects.Permission.fields.createTime.name()}
					bind:expression={args.createTime}
					bind:sort={orderBy.createTime}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.updateUserId.name()}
					bind:expression={args.updateUserId}
					bind:sort={orderBy.updateUserId}
					on:filter={query}
				/>
				<TimestampTh
					name={$LL.graphql.objects.Permission.fields.updateTime.name()}
					bind:expression={args.updateTime}
					bind:sort={orderBy.updateTime}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.createGroupId.name()}
					bind:expression={args.createGroupId}
					bind:sort={orderBy.createGroupId}
					on:filter={query}
				/>
				<IntTh
					name={$LL.graphql.objects.Permission.fields.roleId.name()}
					bind:expression={args.roleId}
					bind:sort={orderBy.roleId}
					on:filter={query}
				/>
				<th />
			</tr>
		</thead>
		{#if isFetching}
			<TableLoading rows={10} cols={16 + 2}/>
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
								<StringTd
									name="ofTypeName"
									bind:value={node.ofTypeName}
									on:save={() => updateField({ id: node?.id, ofTypeName: node?.ofTypeName })}
									errors={errors[row]?.iterms?.ofTypeName}
								/>
								<StringTd
									name="description"
									bind:value={node.description}
									on:save={() => updateField({ id: node?.id, description: node?.description })}
									errors={errors[row]?.iterms?.description}
								/>
								<PermissionLevelTd
									name="level"
									bind:value={node.level}
									on:save={() => updateField({ id: node?.id, level: node?.level })}
									errors={errors[row]?.iterms?.level}
								/>
								<ObjectTd name="role" errors={errors[row]?.iterms?.role} path={`${node.id}/role`} on:gotoField />
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
									name="roleId"
									bind:value={node.roleId}
									on:save={() => updateField({ id: node?.id, roleId: node?.roleId })}
									errors={errors[row]?.iterms?.roleId}
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
					<TableEmpty cols={16 + 2}/>
				{/if}
			</tbody>
		{/if}
	</Table>
</Card>
