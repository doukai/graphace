<script lang="ts">
	import { type Field } from '@graphace/graphql';
	import { Table, TableEmpty } from '@graphace/ui';
	import { FieldThs, FieldTds } from '@graphace/ui-graphql';
	import type { RoleConnection, RoleConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: RoleConnection;
	export let fields: Field[] = [];
	export let queryArguments: RoleConnectionQueryArguments = {};
	export let nullString: string = '-';
	export let getFieldName: (fieldName: string, subFieldName?: string) => string;
	export let getGrouByName: (fieldName: string) => string | undefined = undefined;

	$: nodes = connection?.edges?.map((edge) => edge?.node);
</script>

<Table className="table-zebra table-pin-rows md:table-sm">
	<thead>
		<FieldThs className="border" {fields} {getFieldName} let:deep>
			{#each queryArguments.groupBy || [] as groupByField}
				<td class="border" rowspan={deep}>{getGrouByName(groupByField)}</td>
			{/each}
		</FieldThs>
	</thead>
	<tbody>
		{#if nodes && nodes.length > 0}
			{#each nodes || [] as node}
				<tr class="hover">
					{#each queryArguments.groupBy || [] as groupByField}
						{#if node?.[groupByField] == null}
							<td class="border">{nullString}</td>
						{:else}
							<td class="border">{node?.[groupByField]}</td>
						{/if}
					{/each}
					<FieldTds className="border" {fields} {node} />
				</tr>
			{/each}
		{:else}
			<TableEmpty cols={(queryArguments.groupBy?.length || 0) + fields.length} />
		{/if}
	</tbody>
</Table>
