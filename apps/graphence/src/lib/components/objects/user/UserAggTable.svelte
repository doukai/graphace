<script lang="ts">
	import { type Field } from '@graphace/graphql';
	import UserAgg from '~/lib/components/objects/user/UserAgg.svelte';
	import { Table, TableLoading, TableEmpty } from '@graphace/ui';
	import { FieldThs, FieldTds } from '@graphace/ui-graphql';
	import type { UserConnection, UserConnectionQueryArguments } from '~/lib/types/schema';

	export let connection: UserConnection;
	export let fields: Field[] = [];
	export let queryArguments: UserConnectionQueryArguments = {};
	export let isFetching: boolean = false;
	export let showHeader: boolean = true;
	export let showFooter: boolean = true;
	export let showOptionButton: boolean = true;
	export let showFilterButton: boolean = true;
	export let showBookmarkButton: boolean = false;

	$: nodes = connection?.edges?.map((edge) => edge?.node);
	$: totalCount = connection?.totalCount || 0;
</script>

<UserAgg
	bind:fields
	bind:queryArguments
	{isFetching}
	{showHeader}
	{showFooter}
	{showOptionButton}
	{showFilterButton}
	{showBookmarkButton}
	{totalCount}
	className="p-0"
	on:query
	on:bookmark
	let:getFieldName
	let:getGrouByName
>
	<Table className="table-zebra table-pin-rows md:table-sm">
		<thead>
			<FieldThs className="border" {fields} {getFieldName} let:deep>
				{#each queryArguments.groupBy || [] as groupByField}
					<td class="border" rowspan={deep}>{getGrouByName(groupByField)}</td>
				{/each}
			</FieldThs>
		</thead>
		<tbody>
			{#if isFetching}
				<TableLoading rows={10} cols={(queryArguments.groupBy?.length || 0) + fields.length} />
			{:else if nodes && nodes.length > 0}
				{#each nodes || [] as node}
					<tr class="hover">
						{#each queryArguments.groupBy || [] as groupByField}
							<td class="border">{node[groupByField]}</td>
						{/each}
						<FieldTds className="border" {fields} {node} />
					</tr>
				{/each}
			{:else}
				<TableEmpty cols={(queryArguments.groupBy?.length || 0) + fields.length} />
			{/if}
		</tbody>
	</Table>
</UserAgg>
