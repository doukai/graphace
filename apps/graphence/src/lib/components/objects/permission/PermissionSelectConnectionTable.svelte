<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import { type GraphQLError, buildArguments } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, Pagination, messageBoxs, notifications, z_index } from '@graphace/ui';
	import { IDTh, IDTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import { buildGraphQLErrors, buildGlobalGraphQLErrorMessage } from '~/utils';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		PermissionOrderBy,
		QueryPermissionConnectionArgs,
		PermissionInput
	} from '~/lib/types/schema';

	export let nodes: (PermissionInput | null | undefined)[] | null | undefined = undefined;
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
			args: QueryPermissionConnectionArgs;
			then: (data: (PermissionInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: PermissionInput;
			then: (data: PermissionInput | null | undefined) => void;
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

	export const queryPage = (toPageNumber?: number | undefined) => {
		let _args: QueryPermissionConnectionArgs = buildArguments(args);

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
		let _args: QueryPermissionConnectionArgs = {};
		if (searchValue) {
			_args.cond = 'OR';
			_args.description = { opr: 'LK', val: `%${searchValue}%` };
			_args.field = { opr: 'LK', val: `%${searchValue}%` };
			_args.type = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			_args.cond = undefined;
			_args.description = undefined;
			_args.field = undefined;
			_args.type = undefined;
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

	const updateField = (args: PermissionInput | null | undefined, row?: number) => {
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
				? selectedIdList.flatMap((id) => nodes?.find((node) => node?.name === id)).map((node) => ({ description: node?.description, field: node?.field, type: node?.type, permissionType: node?.permissionType, where: { name: { val: node?.name } } }))
				: nodes?.filter((node) => node?.name === selectedIdList)?.map((node) => ({ description: node?.description, field: node?.field, type: node?.type, permissionType: node?.permissionType, where: { name: { val: node?.name } } }))[0],
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
									selectedIdList = selectAll ? nodes.map((node) => node?.name) : [];
								}
							}}
						/>
					</label>
				{/if}
			</th>
			{#if permissions.auth('Permission::name::*')}
			<IDTh
				name={$LL.graphql.objects.Permission.fields.name.name()}
				bind:value={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Permission::description::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.description.name()}
				bind:value={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Permission::field::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.field.name()}
				bind:value={args.field}
				bind:sort={orderBy.field}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Permission::type::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.type.name()}
				bind:value={args.type}
				bind:sort={orderBy.type}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Permission::permissionType::*')}
			<PermissionTypeTh
				name={$LL.graphql.objects.Permission.fields.permissionType.name()}
				bind:value={args.permissionType}
				bind:sort={orderBy.permissionType}
				on:filter={(e) => queryPage(1)}
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
					{#if node}
						<tr class="hover">
							<th class="{z_class} w-12">
								<label>
									{#if multipleSelect}
										<input type="checkbox" class="checkbox md:checkbox-sm" bind:group={selectedIdList} value={node.name} />
									{:else}
										<input type="radio" class="radio md:radio-sm" bind:group={selectedIdList} value={node.name} />
									{/if}
								</label>
							</th>
							{#if permissions.auth('Permission::name::*')}
							<IDTd
								name="name"
								bind:value={node.name}
								readonly
								errors={errors?.[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('Permission::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::description::WRITE')}
								errors={errors?.[row]?.iterms?.description}
							/>
							{/if}
							{#if permissions.auth('Permission::field::*')}
							<StringTd
								name="field"
								bind:value={node.field}
								on:save={(e) => updateField({ field: node?.field, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::field::WRITE')}
								errors={errors?.[row]?.iterms?.field}
							/>
							{/if}
							{#if permissions.auth('Permission::type::*')}
							<StringTd
								name="type"
								bind:value={node.type}
								on:save={(e) => updateField({ type: node?.type, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::type::WRITE')}
								errors={errors?.[row]?.iterms?.type}
							/>
							{/if}
							{#if permissions.auth('Permission::permissionType::*')}
							<PermissionTypeTd
								name="permissionType"
								bind:value={node.permissionType}
								on:save={(e) => updateField({ permissionType: node?.permissionType, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::permissionType::WRITE')}
								errors={errors?.[row]?.iterms?.permissionType}
							/>
							{/if}
							<th class="{z_class} hover:{z_class3} w-12">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.graphence.components.table.selectBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.name) {
													dispatch('select', {
														selected: multipleSelect 
																	? [{ description: node?.description, field: node?.field, type: node?.type, permissionType: node?.permissionType, where: { name: { val: node.name } } }] 
																	: { description: node?.description, field: node?.field, type: node?.type, permissionType: node?.permissionType, where: { name: { val: node.name } } },
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