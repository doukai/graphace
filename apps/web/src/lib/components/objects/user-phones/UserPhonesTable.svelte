<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Error } from '@graphace/commons/types';
	import { StringTh, StringTd, TimestampTh, TimestampTd, IDTh, IDTd, BooleanTh, BooleanTd, IntTh, IntTd } from '@graphace/ui-graphql/components/table';
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
	import {
		Conditional,
		Operator,
		UserPhones,
		UserPhonesOrderBy,
		QueryTypeUserPhonesListArgs,
		MutationTypeUserPhonesArgs
	} from '~/lib/types/schema';

	export let nodes: (UserPhones | null | undefined)[] | null | undefined;
	export let isFetching: boolean;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeUserPhonesListArgs;
			then: (data: (UserPhones | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		};
		mutation: {
			args: MutationTypeUserPhonesArgs;
			update?: boolean;
			then: (data: UserPhones | null | undefined) => void;
			catch: (error: Error) => void;
		};
		edit: { id: string };
		create: {};
	}>();

	let errors: Record<string, Record<string, Error>> = {};

	let showDeleteButton = false;
	let searchValue: string | undefined;
	let args: QueryTypeUserPhonesListArgs = {};
	let orderBy: UserPhonesOrderBy = {};

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
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	const search = () => {
		let args: QueryTypeUserPhonesListArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
			args.createGroupId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.phone = { opr: Operator.LK, val: `%${searchValue}%` };
			args.realmId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.createGroupId = undefined;
			args.createUserId = undefined;
			args.phone = undefined;
			args.realmId = undefined;
			args.updateUserId = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	async function updateField(args: MutationTypeUserPhonesArgs | null | undefined) {
		if (args && args.id) {
			errors[args.id] = {};
			validateUpdate('UserPhones', args, $locale)
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

<SectionHead title="UserPhones">
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
			<IDTh
				name="id"
				bind:expression={args.id}
				bind:sort={orderBy.id}
				on:filter={query}
			/>
			<th>isDeprecated</th>
			<StringTh
				name="phone"
				bind:expression={args.phone}
				bind:sort={orderBy.phone}
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
			<IntTh
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
		<TableLoading rows={10} cols={11 + 2}/>
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
							<td>{node.id}</td>
							<BooleanTd
								name="isDeprecated"
								bind:value={node.isDeprecated}
								on:save={() => updateField({ id: node?.id, isDeprecated: node?.isDeprecated })}
								error={errors[node.id]?.isDeprecated}
							/>
							<StringTd
								name="phone"
								bind:value={node.phone}
								on:save={() => updateField({ id: node?.id, phone: node?.phone })}
								error={errors[node.id]?.phone}
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
							<IntTd
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
