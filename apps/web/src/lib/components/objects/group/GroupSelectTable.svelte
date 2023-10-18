<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { StringTh, StringTd, IntTh, IntTd } from '@graphace/ui-graphql/components/table';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Group,
		GroupOrderBy,
		QueryGroupListArgs,
		GroupInput
	} from '~/lib/types/schema';
	import { auth } from '@graphace/commons/stores/useAuth';

	export let nodes: (Group | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryGroupListArgs;
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

	let showSelectButton = false;
	let args: QueryGroupListArgs = {};
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
		let args: QueryGroupListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
			args.path = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
			args.path = undefined;
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
	}
</script>

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
							on:change={() => {
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
				on:filter={query}
			/>
			{/if}
			{#if auth('Group::path::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.path.name()}
				bind:expression={args.path}
				bind:sort={orderBy.path}
				on:filter={query}
			/>
			{/if}
			{#if auth('Group::deep::*')}
			<IntTh
				name={$LL.graphql.objects.Group.fields.deep.name()}
				bind:expression={args.deep}
				bind:sort={orderBy.deep}
				on:filter={query}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={8 + 2}/>
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
								on:save={() => updateField({ name: node?.name, where: { id: { val: node?.id } } })}
								readonly={!auth('Group::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if auth('Group::path::*')}
							<StringTd
								name="path"
								bind:value={node.path}
								on:save={() => updateField({ path: node?.path, where: { id: { val: node?.id } } })}
								readonly={!auth('Group::path::WRITE')}
								errors={errors[row]?.iterms?.path}
							/>
							{/if}
							{#if auth('Group::deep::*')}
							<IntTd
								name="deep"
								bind:value={node.deep}
								on:save={() => updateField({ deep: node?.deep, where: { id: { val: node?.id } } })}
								readonly={!auth('Group::deep::WRITE')}
								errors={errors[row]?.iterms?.deep}
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
				<TableEmpty cols={8 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
