<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import { type GraphQLError, buildArguments } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, Pagination, messageBoxs, notifications, z_index } from '@graphace/ui';
	import { StringTh, StringTd, IntTh, IntTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import { buildGraphQLErrors, buildGlobalGraphQLErrorMessage } from '~/utils';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		GroupOrderBy,
		QueryGroupConnectionArgs,
		GroupInput
	} from '~/lib/types/schema';

	export let nodes: (GroupInput | null | undefined)[] | null | undefined = undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');
	const z_class = z_index.top(1);
	const z_class2 = z_index.top(2);
	const z_class3 = z_index.top(3);

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryGroupConnectionArgs;
			then: (data: (GroupInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: GroupInput;
			then: (data: GroupInput | null | undefined) => void;
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

	export const queryPage = (toPageNumber?: number | undefined) => {
		let _args: QueryGroupConnectionArgs = buildArguments(args);

		if (Object.keys(orderBy).length > 0) {
			_args.orderBy = orderBy;
		} else {
			_args.orderBy = undefined;
		}

		if (after) {
			_args.after = after;
			_args.first = pageSize;
		} else if (before) {
			_args.before = before;
			_args.last = pageSize;
		} else {
			_args.offset = ((toPageNumber || pageNumber) - 1) * pageSize;
			_args.first = pageSize;
		}

		dispatch('fetch', {
			args: _args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	export const search = (searchValue: string | undefined) => {
		let _args: QueryGroupConnectionArgs = {};
		if (searchValue) {
			_args.cond = 'OR';
			_args.name = { opr: 'LK', val: `%${searchValue}%` };
			_args.description = { opr: 'LK', val: `%${searchValue}%` };
			_args.path = { opr: 'LK', val: `%${searchValue}%` };
			_args.parentId = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			_args.cond = undefined;
			_args.name = undefined;
			_args.description = undefined;
			_args.path = undefined;
			_args.parentId = undefined;
		}
		
		if (after) {
			_args.after = after;
			_args.first = pageSize;
		} else if (before) {
			_args.before = before;
			_args.last = pageSize;
		} else {
			_args.offset = (pageNumber - 1) * pageSize;
			_args.first = pageSize;
		}

		dispatch('fetch', {
			args: _args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const updateField = (args: GroupInput | null | undefined, row?: number) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					if (nodes && row) {
						nodes[row] = data;
					}
					notifications.success($LL.graphence.message.saveSuccess());
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					errors = buildGraphQLErrors(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.saveFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								queryPage(1);
								return true;
							}
						});
					}
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
				? selectedIdList.flatMap((id) => nodes?.find((node) => node?.id === id)).map((node) => ({ name: node?.name, description: node?.description, path: node?.path, deep: node?.deep, parentId: node?.parentId, where: { id: { val: node?.id } } }))
				: nodes?.filter((node) => node?.id === selectedIdList)?.map((node) => ({ name: node?.name, description: node?.description, path: node?.path, deep: node?.deep, parentId: node?.parentId, where: { id: { val: node?.id } } }))[0],
			then: () => {
				notifications.success($LL.graphence.message.saveSuccess());
				dispatch('back', {});
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.saveFailed());
			}
		})}
	on:back
/>
<div class="divider" />
<Table className="table-zebra table-pin-rows table-pin-cols md:table-sm">
	<thead>
		<tr class="{z_class2}">
			<th class="w-12">
				{#if multipleSelect}
					<label>
						<input
							type="checkbox"
							class="checkbox md:checkbox-sm"
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
			{#if permissions.auth('Group::name::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.name.name()}
				bind:value={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Group::description::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.description.name()}
				bind:value={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Group::path::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.path.name()}
				bind:value={args.path}
				bind:sort={orderBy.path}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Group::deep::*')}
			<IntTh
				name={$LL.graphql.objects.Group.fields.deep.name()}
				bind:value={args.deep}
				bind:sort={orderBy.deep}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Group::parentId::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.parentId.name()}
				bind:value={args.parentId}
				bind:sort={orderBy.parentId}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={pageSize} cols={10 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node}
						<tr class="hover">
							<th class="{z_class} w-12">
								<label>
									{#if multipleSelect}
										<input type="checkbox" class="checkbox md:checkbox-sm" bind:group={selectedIdList} value={node.id} />
									{:else}
										<input type="radio" class="radio md:radio-sm" bind:group={selectedIdList} value={node.id} />
									{/if}
								</label>
							</th>
							{#if permissions.auth('Group::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::name::WRITE')}
								errors={errors?.[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('Group::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::description::WRITE')}
								errors={errors?.[row]?.iterms?.description}
							/>
							{/if}
							{#if permissions.auth('Group::path::*')}
							<StringTd
								name="path"
								bind:value={node.path}
								on:save={(e) => updateField({ path: node?.path, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::path::WRITE')}
								errors={errors?.[row]?.iterms?.path}
							/>
							{/if}
							{#if permissions.auth('Group::deep::*')}
							<IntTd
								name="deep"
								bind:value={node.deep}
								on:save={(e) => updateField({ deep: node?.deep, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::deep::WRITE')}
								errors={errors?.[row]?.iterms?.deep}
							/>
							{/if}
							{#if permissions.auth('Group::parentId::*')}
							<StringTd
								name="parentId"
								bind:value={node.parentId}
								on:save={(e) => updateField({ parentId: node?.parentId, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::parentId::WRITE')}
								errors={errors?.[row]?.iterms?.parentId}
							/>
							{/if}
							<th class="{z_class} hover:{z_class3} w-12">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.graphence.components.table.selectBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('select', {
														selected: multipleSelect 
																	? [{ name: node?.name, description: node?.description, path: node?.path, deep: node?.deep, parentId: node?.parentId, where: { id: { val: node.id } } }] 
																	: { name: node?.name, description: node?.description, path: node?.path, deep: node?.deep, parentId: node?.parentId, where: { id: { val: node.id } } },
														then: () => {
															notifications.success($LL.graphence.message.saveSuccess());
															dispatch('back', {});
														},
														catch: (errors) => {
															console.error(errors);
															notifications.error($LL.graphence.message.saveFailed());
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
				<TableEmpty cols={10 + 2}/>
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