<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { IDTh, IDTd, IntTh, IntTd, BooleanTh, BooleanTd, StringTh, StringTd, TimestampTh, TimestampTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import {
		Conditional,
		Operator,
		UserGroup,
		UserGroupOrderBy,
		QueryTypeUserGroupListArgs,
		MutationTypeUserGroupArgs
	} from '~/lib/types/schema';

	export let nodes: (UserGroup | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeUserGroupListArgs;
			then: (data: (UserGroup | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		mutation: {
			args: MutationTypeUserGroupArgs;
			update?: boolean;
			then: (data: UserGroup | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		select: {
			selected: string | null | undefined | (string | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		};
		back: {};
	}>();

	let showSelectButton = false;
	let args: QueryTypeUserGroupListArgs = {};
	let orderBy: UserGroupOrderBy = {};

	let selectAll: boolean;
	let selectedIdList: string | null | undefined | (string | null | undefined)[] = multipleSelect
		? []
		: undefined;

	$: if (Array.isArray(selectedIdList) && selectedIdList.length > 0) {
		showSelectButton = true;
	} else {
		showSelectButton = false;
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
		let args: QueryTypeUserGroupListArgs = {};
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

	const updateField = (args: MutationTypeUserGroupArgs | null | undefined) => {
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
</script>

<Card>
	<TableHead
		title="UserGroup"
		showCreateButton={false}
		showSaveButton={false}
		showRemoveButton={false}
		{showSelectButton}
		on:search={(e) => search(e.detail.value)}
		on:select={() =>
			dispatch('select', {
				selected: selectedIdList,
				then: () => dispatch('back'),
				catch: () => {}
			})}
		on:back
	/>
	<div class="divider" />
	<Table>
		<thead>
			<tr>
				<th class="z-10">
					{#if multipleSelect}
						<label>
							<input
								type="checkbox"
								class="checkbox"
								bind:checked={selectAll}
								on:change={() => {
									if (nodes && nodes.length > 0) {
										selectedIdList = selectAll ? nodes.map((node) => node?.id) : [];
									}
								}}
							/>
						</label>
					{/if}
				</th>
				<IDTh
					name="id"
					bind:expression={args.id}
					bind:sort={orderBy.id}
					on:filter={query}
				/>
				<IntTh
					name="userId"
					bind:expression={args.userId}
					bind:sort={orderBy.userId}
					on:filter={query}
				/>
				<IntTh
					name="groupId"
					bind:expression={args.groupId}
					bind:sort={orderBy.groupId}
					on:filter={query}
				/>
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
										{#if multipleSelect}
											<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.id} />
										{:else}
											<input type="radio" class="radio" bind:group={selectedIdList} value={node.id} />
										{/if}
									</label>
								</th>
								<IDTd
									name="id"
									bind:value={node.id}
									readonly
									errors={errors[row]?.iterms?.id}
								/>
								<IntTd
									name="userId"
									bind:value={node.userId}
									on:save={() => updateField({ id: node?.id, userId: node?.userId })}
									errors={errors[row]?.iterms?.userId}
								/>
								<IntTd
									name="groupId"
									bind:value={node.groupId}
									on:save={() => updateField({ id: node?.id, groupId: node?.groupId })}
									errors={errors[row]?.iterms?.groupId}
								/>
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
										<div class="tooltip" data-tip={$LL.web.components.table.selectBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click={(e) => {
													e.preventDefault();
													if (node && node.id) {
														dispatch('select', {
															selected: multipleSelect ? [node.id] : node.id,
															then: () => dispatch('back'),
															catch: () => {}
														});
													}
												}}
											>
												<Icon src={CheckCircle} solid />
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
