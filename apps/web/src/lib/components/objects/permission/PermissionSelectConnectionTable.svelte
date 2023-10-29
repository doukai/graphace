<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, Pagination, notifications } from '@graphace/ui';
	import { IDTh, IDTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Permission,
		PermissionOrderBy,
		QueryPermissionConnectionArgs,
		PermissionInput
	} from '~/lib/types/schema';
	import { auth } from '@graphace/commons';

	export let nodes: (Permission | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryPermissionConnectionArgs;
			then: (data: (Permission | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: PermissionInput;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		select: {
			selected: PermissionInput | null | undefined | (PermissionInput | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	export let showSelectButton = false;
	export let args: QueryPermissionConnectionArgs = {};
	export let orderBy: PermissionOrderBy = {};
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
		let args: QueryPermissionConnectionArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.field = { opr: 'LK', val: `%${searchValue}%` };
			args.type = { opr: 'LK', val: `%${searchValue}%` };
			args.description = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.field = undefined;
			args.type = undefined;
			args.description = undefined;
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

	const updateField = (args: PermissionInput | null | undefined) => {
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
	title={$LL.graphql.objects.Permission.name()}
	showCreateButton={false}
	showSaveButton={false}
	showRemoveButton={false}
	{showSelectButton}
	{showBackButton}
	on:search={(e) => search(e.detail.value)}
	on:select={(e) =>
		dispatch('select', {
			selected: Array.isArray(selectedIdList)
				? selectedIdList.flatMap(id => nodes?.find(node => node?.name == id)).map((node) => ({ ...node, where: { name: { val: node?.name } } }))
				: { ...nodes?.find(node => node?.name == selectedIdList), where: { name: { val: selectedIdList } } },
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
									selectedIdList = selectAll ? nodes.map((node) => node?.name) : [];
								}
							}}
						/>
					</label>
				{/if}
			</th>
			{#if auth('Permission::name::*')}
			<IDTh
				name={$LL.graphql.objects.Permission.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Permission::field::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.field.name()}
				bind:expression={args.field}
				bind:sort={orderBy.field}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Permission::type::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.type.name()}
				bind:expression={args.type}
				bind:sort={orderBy.type}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Permission::permissionType::*')}
			<PermissionTypeTh
				name={$LL.graphql.objects.Permission.fields.permissionType.name()}
				bind:expression={args.permissionType}
				bind:sort={orderBy.permissionType}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if auth('Permission::description::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.description.name()}
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={pageSize} cols={7 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.name}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									{#if multipleSelect}
										<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.name} />
									{:else}
										<input type="radio" class="radio" bind:group={selectedIdList} value={node.name} />
									{/if}
								</label>
							</th>
							{#if auth('Permission::name::*')}
							<IDTd
								name="name"
								bind:value={node.name}
								readonly
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if auth('Permission::field::*')}
							<StringTd
								name="field"
								bind:value={node.field}
								on:save={(e) => updateField({ field: node?.field, where: { name: { val: node?.name } } })}
								readonly={!auth('Permission::field::WRITE')}
								errors={errors[row]?.iterms?.field}
							/>
							{/if}
							{#if auth('Permission::type::*')}
							<StringTd
								name="type"
								bind:value={node.type}
								on:save={(e) => updateField({ type: node?.type, where: { name: { val: node?.name } } })}
								readonly={!auth('Permission::type::WRITE')}
								errors={errors[row]?.iterms?.type}
							/>
							{/if}
							{#if auth('Permission::permissionType::*')}
							<PermissionTypeTd
								name="permissionType"
								bind:value={node.permissionType}
								on:save={(e) => updateField({ permissionType: node?.permissionType, where: { name: { val: node?.name } } })}
								readonly={!auth('Permission::permissionType::WRITE')}
								errors={errors[row]?.iterms?.permissionType}
							/>
							{/if}
							{#if auth('Permission::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { name: { val: node?.name } } })}
								readonly={!auth('Permission::description::WRITE')}
								errors={errors[row]?.iterms?.description}
							/>
							{/if}
							<th class="z-10 hover:z-30 w-12">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.selectBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.name) {
													dispatch('select', {
														selected: multipleSelect ? [{ ...node, where: { name: { val: node.name } } }] : { ...node, where: { name: { val: node.name } } },
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
				<TableEmpty cols={7 + 2}/>
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