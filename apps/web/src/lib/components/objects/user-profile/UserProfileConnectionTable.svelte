<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Error } from '@graphace/commons/types';
	import { ObjectTd, StringTh, StringTd, TimestampTh, TimestampTd, IDTh, IDTd, BooleanTh, BooleanTd, IntTh, IntTd } from '@graphace/ui-graphql/components/table';
	import { SectionHead } from '@graphace/ui/components/section';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import { validateUpdate } from '@graphace/graphql/schema/JsonSchema';
	import { Pagination } from '@graphace/ui/components/connection';
	import {
		Conditional,
		Operator,
		UserProfile,
		UserProfileOrderBy,
		QueryTypeUserProfileConnectionArgs,
		MutationTypeUserProfileArgs
	} from '~/lib/types/schema';

	export let nodes: (UserProfile | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeUserProfileConnectionArgs;
			then: (data: (UserProfile | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		};
		mutation: {
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		};
		edit: { id: string };
		create: {};
	}>();

	let errors: Record<string, Record<string, Error>> = {};

	let showDeleteButton = false;
	let searchValue: string | undefined;
	let args: QueryTypeUserProfileConnectionArgs = {};
	let orderBy: UserProfileOrderBy = {};
	let after: string | undefined;
	let before: string | undefined;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	$: offset = (pageNumber - 1) * pageSize;

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

		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else if (offset) {
			args.offset = offset;
			args.first = pageSize;
		} else {
			args.first = pageSize;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	const search = () => {
		let args: QueryTypeUserProfileConnectionArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
			args.address = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createGroupId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.email = { opr: Operator.LK, val: `%${searchValue}%` };
			args.qq = { opr: Operator.LK, val: `%${searchValue}%` };
			args.realmId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.userId = { opr: Operator.LK, val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.address = undefined;
			args.createGroupId = undefined;
			args.createUserId = undefined;
			args.email = undefined;
			args.qq = undefined;
			args.realmId = undefined;
			args.updateUserId = undefined;
			args.userId = undefined;
		}
		
		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else if (offset) {
			args.offset = offset;
			args.first = pageSize;
		} else {
			args.first = pageSize;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	async function updateField(args: MutationTypeUserProfileArgs | null | undefined) {
		if (args && args.id) {
			errors[args.id] = {};
			validateUpdate('UserProfile', args, $locale)
				.then((data) => {
					if (args) {
						dispatch('mutation', {
							args,
							then: (data) => {
								notifications.success($LL.message.saveSuccess());
							},
							catch: (error) => {
								console.error(error);
								notifications.error($LL.message.saveFailed());
							}
						});
					}
				})
				.catch((validErrors) => {
					if (args.id) {
						errors[args.id] = validErrors;
					}
				});
		}
	}

	async function removeRow(id: string) {
		dispatch('mutation', {
			args: { id: id, isDeprecated: true },
			update: true,
			then: (data) => {
				notifications.success($LL.message.removeSuccess());
				query();
			},
			catch: (error) => {
				console.error(error);
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
			catch: (error) => {
				console.error(error);
				notifications.error($LL.message.removeFailed());
			}
		});
	};
</script>

<SectionHead title="UserProfile">
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
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('create');
			} }
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
				name="address"
				bind:expression={args.address}
				bind:sort={orderBy.address}
				on:filter={query}
			/>
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
				name="email"
				bind:expression={args.email}
				bind:sort={orderBy.email}
				on:filter={query}
			/>
			<IDTh
				name="id"
				bind:expression={args.id}
				bind:sort={orderBy.id}
				on:filter={query}
			/>
			<th>isDeprecated</th>
			<StringTh
				name="qq"
				bind:expression={args.qq}
				bind:sort={orderBy.qq}
				on:filter={query}
			/>
			<StringTh
				name="realmId"
				bind:expression={args.realmId}
				bind:sort={orderBy.realmId}
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
			<th>user</th>
			<StringTh
				name="userId"
				bind:expression={args.userId}
				bind:sort={orderBy.userId}
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
		<TableLoading rows={pageSize} cols={13 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10">
								<label>
									<input type="checkbox" class="checkbox" bind:checked={selectedRows[node.id]} />
								</label>
							</th>
							<StringTd
								name="address"
								bind:value={node.address}
								on:save={() => updateField({ id: node?.id, address: node?.address })}
								error={errors[node.id]?.address}
							/>
							<StringTd
								name="createGroupId"
								bind:value={node.createGroupId}
								on:save={() => updateField({ id: node?.id, createGroupId: node?.createGroupId })}
								error={errors[node.id]?.createGroupId}
							/>
							<TimestampTd
								name="createTime"
								bind:value={node.createTime}
								on:save={() => updateField({ id: node?.id, createTime: node?.createTime })}
								error={errors[node.id]?.createTime}
							/>
							<StringTd
								name="createUserId"
								bind:value={node.createUserId}
								on:save={() => updateField({ id: node?.id, createUserId: node?.createUserId })}
								error={errors[node.id]?.createUserId}
							/>
							<StringTd
								name="email"
								bind:value={node.email}
								on:save={() => updateField({ id: node?.id, email: node?.email })}
								error={errors[node.id]?.email}
							/>
							<td>{node.id}</td>
							<BooleanTd
								name="isDeprecated"
								bind:value={node.isDeprecated}
								on:save={() => updateField({ id: node?.id, isDeprecated: node?.isDeprecated })}
								error={errors[node.id]?.isDeprecated}
							/>
							<StringTd
								name="qq"
								bind:value={node.qq}
								on:save={() => updateField({ id: node?.id, qq: node?.qq })}
								error={errors[node.id]?.qq}
							/>
							<StringTd
								name="realmId"
								bind:value={node.realmId}
								on:save={() => updateField({ id: node?.id, realmId: node?.realmId })}
								error={errors[node.id]?.realmId}
							/>
							<TimestampTd
								name="updateTime"
								bind:value={node.updateTime}
								on:save={() => updateField({ id: node?.id, updateTime: node?.updateTime })}
								error={errors[node.id]?.updateTime}
							/>
							<StringTd
								name="updateUserId"
								bind:value={node.updateUserId}
								on:save={() => updateField({ id: node?.id, updateUserId: node?.updateUserId })}
								error={errors[node.id]?.updateUserId}
							/>
							<ObjectTd name="user" path={`${node.id}/user`} on:gotoField />
							<StringTd
								name="userId"
								bind:value={node.userId}
								on:save={() => updateField({ id: node?.id, userId: node?.userId })}
								error={errors[node.id]?.userId}
							/>
							<IntTd
								name="version"
								bind:value={node.version}
								on:save={() => updateField({ id: node?.id, version: node?.version })}
								error={errors[node.id]?.version}
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
<div class="divider" />
<Pagination
	bind:pageNumber
	bind:pageSize
	{totalCount}
	on:pageChange={query}
	on:sizeChange={query}
/>
