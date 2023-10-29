<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, Pagination, notifications } from '@graphace/ui';
	import { StringTh, StringTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Group,
		GroupOrderBy,
		QueryGroupConnectionArgs,
		GroupInput
	} from '~/lib/types/schema';
	import { auth } from '@graphace/commons';

	export let nodes: (Group | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryGroupConnectionArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: GroupInput;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		select: {
			selected: GroupInput | null | undefined | (GroupInput | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	export let showSelectButton = false;
	export let args: QueryGroupConnectionArgs = {};
	export let orderBy: GroupOrderBy = {};
	export let after: string | undefined = undefined;
	export let before: string | undefined = undefined;
	export let pageNumber: number = 1;
	export let pageSize: number = 10;

	let selectAll: boolean;
	export let selectedIdList: string | null | undefined | (string | null | undefined)[] = multipleSelect
		? []
		: undefined;

	$: if (selectedIdList && !Array.isArray(selectedIdList) || Array.isArray(selectedIdList) && selectedIdList.length > 0) {
		showSelectButton = true;
	} else {
		showSelectButton = false;
	}

	export const query = () => {
		pageNumber = 1;
		queryPage();
	};

	export const queryPage = () => {
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

	export const search = (searchValue: string | undefined) => {
		let args: QueryGroupConnectionArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
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

	const updateField = (args: GroupInput | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
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
</script>

<TableHead
	title={$LL.graphql.objects.Group.name()}
	showCreateButton={false}
	showSaveButton={false}
	showRemoveButton={false}
	{showSelectButton}
	{showBackButton}
	on:search={(e) => search(e.detail.value)}
	on:select={(e) =>
		dispatch('select', {
			selected: Array.isArray(selectedIdList)
				? selectedIdList.flatMap(id => nodes?.find(node => node?.id == id)).map((node) => ({ ...node, where: { id: { val: node?.id } } }))
				: { ...nodes?.find(node => node?.id == selectedIdList), where: { id: { val: selectedIdList } } },
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
		<tr class="z-20">
			<th class="w-12">
				{#if multipleSelect}
					<label>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={selectAll}
							on:change={(e) => {
								if (nodes && nodes.length > 0) {
									selectedIdList = selectAll ? nodes.map((node) => node?.id) : [];
								}
							}}
						/>
					</label>
				{/if}
			</th>
			{#if auth('Group::name::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={pageSize} cols={6 + 2}/>
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
							{#if auth('Group::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } })}
								readonly={!auth('Group::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							<th class="z-10 hover:z-30 w-12">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.selectBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('select', {
														selected: multipleSelect ? [{ ...node, where: { id: { val: node.id } } }] : { ...node, where: { id: { val: node.id } } },
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
				<TableEmpty cols={6 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
<div class="divider" />
<Pagination
	bind:pageNumber
	bind:pageSize
	{totalCount}
	on:pageChange={(e) => queryPage()}
	on:sizeChange={(e) => queryPage()}
/>