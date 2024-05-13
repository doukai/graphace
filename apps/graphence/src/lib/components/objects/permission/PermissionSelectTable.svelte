<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, messageBoxs, notifications } from '@graphace/ui';
	import { IDTh, IDTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		PermissionOrderBy,
		QueryPermissionListArgs,
		PermissionInput
	} from '~/lib/types/schema';
	import { buildGraphQLErrors, buildGlobalGraphQLErrorMessage } from '~/lib/utils/validate-util';
	import { permissions } from '~/lib/utils/auth-util';

	export let nodes: (PermissionInput | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryPermissionListArgs;
			then: (data: (PermissionInput| null | undefined)[] | null | undefined) => void;
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
	export let args: QueryPermissionListArgs = {};
	export let orderBy: PermissionOrderBy = {};

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
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	export const search = (searchValue: string | undefined) => {
		let args: QueryPermissionListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.description = { opr: 'LK', val: `%${searchValue}%` };
			args.field = { opr: 'LK', val: `%${searchValue}%` };
			args.type = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.description = undefined;
			args.field = undefined;
			args.type = undefined;
		}

		dispatch('fetch', {
			args,
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
								query();
								return true;
							}
						});
					}
				}
			});
		}
	}
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
			{#if permissions.auth('Permission::name::*')}
			<IDTh
				name={$LL.graphql.objects.Permission.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::description::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.description.name()}
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::field::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.field.name()}
				bind:expression={args.field}
				bind:sort={orderBy.field}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::type::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.type.name()}
				bind:expression={args.type}
				bind:sort={orderBy.type}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::permissionType::*')}
			<PermissionTypeTh
				name={$LL.graphql.objects.Permission.fields.permissionType.name()}
				bind:expression={args.permissionType}
				bind:sort={orderBy.permissionType}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={7 + 2}/>
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
							{#if permissions.auth('Permission::name::*')}
							<IDTd
								name="name"
								bind:value={node.name}
								readonly
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('Permission::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::description::WRITE')}
								errors={errors[row]?.iterms?.description}
							/>
							{/if}
							{#if permissions.auth('Permission::field::*')}
							<StringTd
								name="field"
								bind:value={node.field}
								on:save={(e) => updateField({ field: node?.field, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::field::WRITE')}
								errors={errors[row]?.iterms?.field}
							/>
							{/if}
							{#if permissions.auth('Permission::type::*')}
							<StringTd
								name="type"
								bind:value={node.type}
								on:save={(e) => updateField({ type: node?.type, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::type::WRITE')}
								errors={errors[row]?.iterms?.type}
							/>
							{/if}
							{#if permissions.auth('Permission::permissionType::*')}
							<PermissionTypeTd
								name="permissionType"
								bind:value={node.permissionType}
								on:save={(e) => updateField({ permissionType: node?.permissionType, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::permissionType::WRITE')}
								errors={errors[row]?.iterms?.permissionType}
							/>
							{/if}
							<th class="z-10 hover:z-30 w-12">
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
