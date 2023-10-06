<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { graphql, PermissionType, PermissionTypeFieldsQuery$result } from '$houdini';
	import type { GraphQLError } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Permission, PermissionInput } from '~/lib/types/schema';

	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let roleId: string | null | undefined = undefined;
	export let typeName: string | null | undefined = undefined;

	let result: PermissionTypeFieldsQuery$result | null | undefined;

	const dispatch = createEventDispatcher<{
		parentMutation: {
			args: PermissionInput[];
			then: (data: Permission[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	const PermissionTypeFieldsQuery = graphql(`
		query PermissionTypeFieldsQuery(
			$role_id: StringExpression
			$type: StringExpression
			$field: StringExpression
		) {
			role(id: $role_id) {
				id
				permissions(type: $type, field: $field) {
					name
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

	$: if (typeName) {
		query(typeName);
	}

	$: result = $PermissionTypeFieldsQuery.data;

	let selectAllRead: boolean;
	let selectAllWrite: boolean;
	let selectedIdList: (string | null)[] = [];
	let fieldReadList: (string | null)[] = [];
	let fieldWriteList: (string | null)[] = [];

	const query = (typeName?: string | null | undefined) => {
		let variables = {
			role_id: { val: roleId },
			type: typeName ? { val: typeName } : undefined
		};
		PermissionTypeFieldsQuery.fetch({ variables }).catch((errors) => {
			console.error(errors);
			notifications.error($LL.web.message.requestFailed());
		});
	};
</script>

<Card>
	<TableHead
		title={$LL.graphql.objects.Permission.name()}
		showRemoveButton={showRemoveButton && selectedIdList.length > 0}
		showUnbindButton={showUnbindButton && selectedIdList.length > 0}
		{showSaveButton}
		{showGotoSelectButton}
		{showBackButton}
		on:create
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
					{#each result?.permissionList as node, row}
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
