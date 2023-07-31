<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { IDTh, IDTd, StringTh, StringTd, BooleanTh, BooleanTd, IntTh, IntTd, TimestampTh, TimestampTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Group,
		GroupOrderBy,
		QueryTypeGroupListArgs,
		MutationTypeGroupArgs
	} from '~/lib/types/schema';

	export let nodes: (Group | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;

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
		select: {
			selected: MutationTypeGroupArgs | null | undefined | (MutationTypeGroupArgs | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		};
		back: {};
	}>();

	let showSelectButton = false;
	let args: QueryTypeGroupListArgs = {};
	let orderBy: GroupOrderBy = {};

	let selectAll: boolean;
	let selectedIdList: string | null | undefined | (string | null | undefined)[] = multipleSelect
		? []
		: undefined;

	$: if (selectedIdList && !Array.isArray(selectedIdList) || Array.isArray(selectedIdList) && selectedIdList.length > 0) {
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
		let args: QueryTypeGroupListArgs = {};
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
	}
</script>

<Card>
	<TableHead
		title={$LL.graphql.objects.Group.name()}
		showCreateButton={false}
		showSaveButton={false}
		showRemoveButton={false}
		{showSelectButton}
		{showBackButton}
		on:search={(e) => search(e.detail.value)}
		on:select={() =>
			dispatch('select', {
				selected: Array.isArray(selectedIdList)
					? selectedIdList.flatMap((id) => nodes?.find((node) => node?.id === id))
					: nodes?.find((node) => node?.id === selectedIdList),
				then: () => {
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			})}
		on:back
	/>
	<div class="divider" />
	<Table>
		<thead>
			<tr>
				<th class="z-10 w-12">
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
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={() => updateField({ id: node?.id, name: node?.name })}
									errors={errors[row]?.iterms?.name}
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
								<IntTd
									name="parentId"
									bind:value={node.parentId}
									on:save={() => updateField({ id: node?.id, parentId: node?.parentId })}
									errors={errors[row]?.iterms?.parentId}
								/>
								<th class="z-10 w-12">
									<div class="flex space-x-1">
										<div class="tooltip" data-tip={$LL.web.components.table.selectBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click={(e) => {
													e.preventDefault();
													if (node && node.id) {
														dispatch('select', {
															selected: multipleSelect ? [node] : node,
															then: () => {
																notifications.success($LL.web.message.saveSuccess());
																dispatch('back');
															},
															catch: (errors) => {
																console.error(errors);
																notifications.error($LL.web.message.saveFailed());
															}
														});
													}
												}}
											>
												<Icon src={ArchiveBoxArrowDown} solid />
											</button>
										</div>
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
