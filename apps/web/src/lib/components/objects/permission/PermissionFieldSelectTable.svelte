<script lang="ts">
	import { graphql, PermissionType, PermissionTypeFieldsQuery$result } from '$houdini';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';

	export let showBackButton: boolean = true;
	export let roleId: string | null | undefined = undefined;
	export let typeName: string | null | undefined = undefined;

	let result: PermissionTypeFieldsQuery$result | null | undefined;

	let selectAllRead: boolean;
	let selectAllWrite: boolean;
	let fieldReadList: (string | null | undefined)[] | null | undefined = [];
	let fieldWriteList: (string | null | undefined)[] | null | undefined = [];

	const PermissionTypeFieldsQuery = graphql(`
		query PermissionTypeFieldsQuery(
			$roleId: StringExpression
			$type: StringExpression
			$field: StringExpression
		) {
			role(id: $roleId) {
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
			$roleId: Int
			$removeNameList: [String]
			$insertList: [RolePermissionInput]
		) {
			removeList: rolePermissionList(
				isDeprecated: true
				where: { roleId: { val: $roleId }, permissionName: { opr: IN, in: $removeNameList } }
			) {
				id
			}
			insertList: rolePermissionList(list: $insertList) {
				id
			}
		}
	`);

	$: if (typeName) {
		query(typeName);
	}

	$: result = $PermissionTypeFieldsQuery.data;
	$: permissionNameList = fieldReadList?.concat(fieldWriteList);

	const query = (typeName?: string | null | undefined) => {
		let variables = {
			roleId: { val: roleId },
			type: typeName ? { val: typeName } : undefined
		};
		PermissionTypeFieldsQuery.fetch({ variables })
			.then((result) => {
				fieldReadList =
					result.data?.role?.permissions
						?.filter((permission) => permission?.permissionType === PermissionType.READ)
						.map((permission) => permission?.name) || [];
				fieldWriteList =
					result.data?.role?.permissions
						?.filter((permission) => permission?.permissionType === PermissionType.WRITE)
						.map((permission) => permission?.name) || [];
			})
			.catch((errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			});
	};

	const mutation = () => {
		let variables = {
			roleId: parseInt(roleId || ''),
			removeNameList: result?.role?.permissions
				?.map((permission) => permission?.name)
				.filter((name) => name && !permissionNameList?.includes(name)),
			insertList: permissionNameList?.map((name) => ({
				roleId: parseInt(roleId || ''),
				permissionName: name
			}))
		};
		PermissionTypeFieldsMutation.mutate(variables)
			.then(() => {
				query(typeName);
			})
			.catch((errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			});
	};
</script>

<Card>
	<TableHead
		title={$LL.graphql.objects.Permission.name()}
		showSelectButton={(fieldReadList?.length || 0) > 0 || (fieldWriteList?.length || 0) > 0}
		showCreateButton={false}
		showSaveButton={false}
		showRemoveButton={false}
		{showBackButton}
		on:select={() => {
			mutation();
		}}
		on:back
	/>
	<div class="divider" />
	<Table>
		<thead>
			<tr class="z-20">
				<td>{$LL.graphql.objects.Permission.fields.type.name()} </td>
				<td>{$LL.graphql.objects.Permission.fields.field.name()} </td>
				<td>
					<div class="flex items-center gap-2">
						<label>
							<input
								type="checkbox"
								class="checkbox"
								bind:checked={selectAllRead}
								on:change={() => {
									if (result?.permissionList && result?.permissionList.length > 0) {
										fieldReadList = selectAllRead
											? result?.permissionList.map(
													(node) => node?.type + '::' + node?.field + '::' + PermissionType.READ
											  )
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
									if (result?.permissionList && result?.permissionList.length > 0) {
										fieldWriteList = selectAllWrite
											? result?.permissionList.map(
													(node) => node?.type + '::' + node?.field + '::' + PermissionType.WRITE
											  )
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
				{#if result?.permissionList && result?.permissionList.length > 0}
					{#each result?.permissionList as node}
						{#if node}
							<tr class="hover">
								<td>{node.type}</td>
								<td>{node.field}</td>
								<td>
									<label>
										<input
											type="checkbox"
											class="checkbox"
											bind:group={fieldReadList}
											value={node?.type + '::' + node?.field + '::' + PermissionType.READ}
										/>
									</label>
								</td>
								<td>
									<label>
										<input
											type="checkbox"
											class="checkbox"
											bind:group={fieldWriteList}
											value={node?.type + '::' + node?.field + '::' + PermissionType.WRITE}
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
</Card>
