<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Table, TableLoading, TableEmpty, AutoComplete, notifications } from '@graphace/ui';
	import { graphql } from '$houdini';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link, ArrowUturnLeft } from '@steeze-ui/heroicons';
	import type { PermissionType } from '~/lib/types/schema';
	import type { PermissionTypesQueryVariables } from './$houdini';

	export let showBackButton: boolean = true;
	export let showSelectButton: boolean = false;
	export let roleId: string | null | undefined = undefined;
	export let typeName: string | null | undefined = undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	const dispatch = createEventDispatcher<{
		back: {};
	}>();

	export const _PermissionTypesQueryVariables: PermissionTypesQueryVariables = ({ props }) => {
		return { first: 10 };
	};

	const PermissionTypesQuery = graphql(`
		query PermissionTypesQuery($type: StringExpression, $first: Int) @load {
			permissionConnection(type: $type, first: $first, groupBy: ["type"]) {
				totalCount
				edges {
					node {
						type
					}
				}
			}
		}
	`);

	$: typeNames = $PermissionTypesQuery.data?.permissionConnection?.edges?.map(
		(edge) => edge?.node?.type
	);

	const PermissionTypeFieldsQuery = graphql(`
		query PermissionTypeFieldsQuery(
			$roleRef: StringExpression
			$type: StringExpression
			$field: StringExpression
		) {
			role(id: $roleRef) {
				id
				permissions(type: $type, field: $field) {
					name
					permissionType
				}
			}
			permissionList(
				type: $type
				field: $field
				groupBy: ["type", "field"]
				orderBy: { type: ASC, field: ASC }
			) {
				type
				field
			}
		}
	`);

	const PermissionTypeFieldsMutation = graphql(`
		mutation PermissionTypeFieldsMutation(
			$roleRef: String
			$removedPermissionNameList: [String]
			$permissionNameList: [String]
			$insertList: [PermissionRoleRelationInput]
		) {
			removeList: permissionRoleRelationList(
				isDeprecated: true
				where: {
					roleRef: { val: $roleRef }
					permissionRef: { opr: IN, arr: $removedPermissionNameList }
				}
			) {
				id
			}
			insertList: permissionRoleRelationList(list: $insertList) {
				id
			}
			syncPermissionRoleRelationPolicy(
				roleId: $roleRef
				permissionNameList: $permissionNameList
				removedPermissionNameList: $removedPermissionNameList
			)
		}
	`);

	let permissionList: ({ type: string; field: string } | null)[] | null | undefined;

	let permissions: ({ name: string; permissionType: PermissionType } | null)[] | null | undefined;

	let items:
		| {
				value: any | null | undefined;
				label: string | null | undefined;
				node?: any | null | undefined;
		  }[]
		| null
		| undefined = [];

	let selectAllRead: boolean;
	let selectAllWrite: boolean;
	let fieldReadList: (string | null | undefined)[] | null | undefined = [];
	let fieldWriteList: (string | null | undefined)[] | null | undefined = [];

	$: showSelectButton = (fieldReadList?.length || 0) > 0 || (fieldWriteList?.length || 0) > 0;

	let selectedItem:
		| { value: string | null | undefined; label: string | null | undefined }
		| null
		| undefined = undefined;

	$: typeName = selectedItem?.value;

	$: permissionNameList = fieldReadList?.concat(fieldWriteList);

	$: if (typeNames) {
		items = typeNames.map((typeName) => ({
			value: typeName,
			label: typeName
		}));
	}

	$: if (typeName) {
		query(typeName);
	}

	const query = (typeName?: string | null | undefined) => {
		let variables = {
			roleRef: { val: roleId },
			type: typeName ? { val: typeName } : undefined
		};
		PermissionTypeFieldsQuery.fetch({ variables })
			.then((result) => {
				permissionList = result.data?.permissionList;
				permissions = result.data?.role?.permissions;
				fieldReadList =
					permissions
						?.filter((permission) => permission?.permissionType === 'READ')
						.map((permission) => permission?.name) || [];
				fieldWriteList =
					permissions
						?.filter((permission) => permission?.permissionType === 'WRITE')
						.map((permission) => permission?.name) || [];
			})
			.catch((errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			});
	};

	const mutation = () => {
		let variables = {
			roleRef: roleId,
			removedPermissionNameList: permissions
				?.map((permission) => permission?.name)
				.filter((name) => name && !permissionNameList?.includes(name)),
			permissionNameList: permissionNameList,
			insertList: permissionNameList?.map((name) => ({
				roleRef: roleId,
				permissionRef: name
			}))
		};
		PermissionTypeFieldsMutation.mutate(variables)
			.then(() => {
				notifications.success($LL.graphence.message.saveSuccess());
				query(typeName);
			})
			.catch((errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			});
	};
</script>

<div class="flex justify-between">
	<div class="hidden md:flex items-center">
		<span class="text-xl font-semibold">{$LL.graphql.objects.Permission.name()}</span>
	</div>
	<div class="flex justify-between w-full md:w-auto space-x-1">
		<div class="flex">
			<AutoComplete
				placeholder={$LL.graphql.objects.Permission.fields.type.name()}
				on:search={(e) => {
					PermissionTypesQuery.fetch({
						variables: {
							first: 10,
							type: e.detail.searchValue
								? { opr: 'LK', val: `%${e.detail.searchValue}%` }
								: undefined
						}
					});
				}}
				{items}
				bind:selectedItem
				multiple
			/>
		</div>
		<div class="flex space-x-1">
			{#if showSelectButton}
				<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.select()}>
					<button
						class="btn btn-secondary btn-square md:hidden"
						on:click|preventDefault={() => {
							mutation();
						}}
					>
						<Icon src={Link} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-secondary"
					on:click|preventDefault={() => {
						mutation();
					}}
				>
					{$LL.ui.button.select()}
				</button>
			{/if}
			{#if showBackButton}
				<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.back()}>
					<button
						class="btn btn-neutral btn-square md:hidden"
						on:click|preventDefault={(e) => {
							dispatch('back', {});
						}}
					>
						<Icon src={ArrowUturnLeft} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-neutral"
					on:click|preventDefault={(e) => {
						dispatch('back', {});
					}}
				>
					{$LL.ui.button.back()}
				</button>
			{/if}
		</div>
	</div>
</div>
<div class="divider" />
<Table>
	<thead>
		<tr class="z-20">
			<td>{$LL.graphql.objects.Permission.fields.field.name()} </td>
			<td>
				<div class="flex items-center gap-2">
					<label>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={selectAllRead}
							on:change={() => {
								if (permissionList && permissionList.length > 0) {
									fieldReadList = selectAllRead
										? permissionList.map((node) => node?.type + '::' + node?.field + '::' + 'READ')
										: [];
								}
							}}
						/>
					</label>
					{$LL.graphql.enums.PermissionType.values.READ.name()}
				</div>
			</td>
			<td>
				<div class="flex items-center gap-2">
					<label class="label cursor-pointer">
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={selectAllWrite}
							on:change={() => {
								if (permissionList && permissionList.length > 0) {
									fieldWriteList = selectAllWrite
										? permissionList.map((node) => node?.type + '::' + node?.field + '::' + 'WRITE')
										: [];
								}
							}}
						/>
					</label>
					{$LL.graphql.enums.PermissionType.values.WRITE.name()}
				</div>
			</td>
		</tr>
	</thead>
	{#if $PermissionTypeFieldsQuery.fetching}
		<TableLoading rows={10} cols={2 + 2} />
	{:else}
		<tbody>
			{#if permissionList && permissionList.length > 0}
				{#each permissionList as node}
					{#if node}
						<tr class="hover">
							<td>{node.field}</td>
							<td>
								<label>
									<input
										type="checkbox"
										class="checkbox"
										bind:group={fieldReadList}
										value={node?.type + '::' + node?.field + '::' + 'READ'}
									/>
								</label>
							</td>
							<td>
								<label>
									<input
										type="checkbox"
										class="checkbox"
										bind:group={fieldWriteList}
										value={node?.type + '::' + node?.field + '::' + 'WRITE'}
									/>
								</label>
							</td>
						</tr>
					{/if}
				{/each}
			{:else}
				<TableEmpty cols={2 + 2} />
			{/if}
		</tbody>
	{/if}
</Table>
