<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, StringTh, StringTd, TimestampTh, TimestampTd, IDTh, IDTd, BooleanTh, BooleanTd, IntTh, IntTd } from '@graphace/ui-graphql/components/table';
	import PermissionLevelTh from '~/lib/components/enums/permission-level/PermissionLevelTh.svelte';
	import PermissionLevelTd from '~/lib/components/enums/permission-level/PermissionLevelTd.svelte';
	import { SectionHead } from '@graphace/ui/components/section';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash, ChevronLeft } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import {
		Conditional,
		Operator,
		Permission,
		PermissionOrderBy,
		QueryTypePermissionListArgs,
		MutationTypePermissionArgs
	} from '~/lib/types/schema';

	export let nodes: (Permission | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};

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
		edit: { id: string };
		create: {};
		save: { nodes: (Permission | null | undefined)[] | null | undefined };
		back: {};
	}>();

	let showDeleteButton = false;
	let searchValue: string | undefined;
	let args: QueryTypePermissionListArgs = {};
	let orderBy: PermissionOrderBy = {};

	let selectAll: boolean;
	let selectedRows: Record<string, boolean> = {};

	$: selectedIdList = Object.keys(selectedRows)
		.filter((id) => selectedRows[id])
		.map((id) => id);

	$: if (selectedIdList.length > 0) {
		showDeleteButton = true;
	} else {
		showDeleteButton = false;
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

	const search = () => {
		let args: QueryTypePermissionListArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
			args.createGroupId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.description = { opr: Operator.LK, val: `%${searchValue}%` };
			args.name = { opr: Operator.LK, val: `%${searchValue}%` };
			args.ofTypeName = { opr: Operator.LK, val: `%${searchValue}%` };
			args.realmId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.createGroupId = undefined;
			args.createUserId = undefined;
			args.description = undefined;
			args.name = undefined;
			args.ofTypeName = undefined;
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

	const updateField = (args: MutationTypePermissionArgs | null | undefined) => {
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

<SectionHead title="Permission">
	<SearchInput bind:value={searchValue} on:search={search} />
	{#if showDeleteButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
			<button
				class="btn btn-error btn-outline btn-square"
				on:click={(e) => {
					e.preventDefault();
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
			>
				<Icon src={Trash} class="h-6 w-6" solid />
			</button>
		</div>
	{/if}
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.create()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('create');
			}}
		>
			<Icon src={Plus} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('create');
		}}
	>
		{$LL.routers.type.create()}
	</button>
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.back()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('back');
			}}
		>
			<Icon src={ChevronLeft} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('back');
		}}
	>
		{$LL.routers.type.back()}
	</button>
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.save()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('save', { nodes });
			}}
		>
			<Icon src={ChevronLeft} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('save', { nodes });
		}}
	>
		{$LL.routers.type.save()}
	</button>
</SectionHead>
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
			<StringTh
				name="description"
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={query}
			/>
			<IDTh
				name="id"
				bind:expression={args.id}
				bind:sort={orderBy.id}
				on:filter={query}
			/>
			<th>isDeprecated</th>
			<PermissionLevelTh
				name="level"
				bind:expression={args.level}
				bind:sort={orderBy.level}
				on:filter={query}
			/>
			<StringTh
				name="name"
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={query}
			/>
			<StringTh
				name="ofTypeName"
				bind:expression={args.ofTypeName}
				bind:sort={orderBy.ofTypeName}
				on:filter={query}
			/>
			<th>realm</th>
			<StringTh
				name="realmId"
				bind:expression={args.realmId}
				bind:sort={orderBy.realmId}
				on:filter={query}
			/>
			<th>role</th>
			<IntTh
				name="roleId"
				bind:expression={args.roleId}
				bind:sort={orderBy.roleId}
				on:filter={query}
			/>
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
		<TableLoading rows={10} cols={14 + 2}/>
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
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={() => updateField({ id: node?.id, description: node?.description })}
								errors={errors[row]?.iterms?.description}
							/>
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
							<PermissionLevelTd
								name="level"
								bind:value={node.level}
								on:save={() => updateField({ id: node?.id, level: node?.level })}
								errors={errors[row]?.iterms?.level}
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
							<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
							<StringTd
								name="realmId"
								bind:value={node.realmId}
								on:save={() => updateField({ id: node?.id, realmId: node?.realmId })}
								errors={errors[row]?.iterms?.realmId}
							/>
							<ObjectTd name="role" errors={errors[row]?.iterms?.role} path={`${node.id}/role`} on:gotoField />
							<IntTd
								name="roleId"
								bind:value={node.roleId}
								on:save={() => updateField({ id: node?.id, roleId: node?.roleId })}
								errors={errors[row]?.iterms?.roleId}
							/>
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
							<IntTd
								name="version"
								bind:value={node.version}
								on:save={() => updateField({ id: node?.id, version: node?.version })}
								errors={errors[row]?.iterms?.version}
							/>
							<td>
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
										<Icon src={PencilAlt} solid />
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
							</td>
						</tr>
					{/if}
				{/each}
			{/if}
		</tbody>
	{/if}
</Table>
