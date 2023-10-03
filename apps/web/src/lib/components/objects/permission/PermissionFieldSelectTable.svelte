<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { graphql, Operator, PermissionTypeFieldsQuery$result } from '$houdini';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, StringTh, StringTd } from '@graphace/ui-graphql/components/table';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Permission,
		PermissionOrderBy,
		QueryPermissionListArgs,
		PermissionInput
	} from '~/lib/types/schema';

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

	let args: QueryPermissionListArgs = {};
	let orderBy: PermissionOrderBy = {};

	let selectAll: boolean;
	let selectedIdList: (string | null)[] = [];

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
			</tr>
		</thead>
		{#if $PermissionTypeFieldsQuery.fetching}
			<TableLoading rows={10} cols={2 + 2} />
		{:else}
			<tbody>
				{#if result?.permissionList && result?.permissionList.length > 0}
					{#each result?.permissionList as node, row}
						{#if node}
							<tr>
								<td>{node.type} </td>
								<td>{node.field} </td>
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
