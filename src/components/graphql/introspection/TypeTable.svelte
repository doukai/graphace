<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import { TypeManager } from '$lib/TypeManager';
	import { __TypeKind } from '$lib/__TypeKind';
	import type { __Type } from '$lib/__Type';
	import { goto } from '$app/navigation';
	import Table from '@components/ui/table/Table.svelte';
	import TableLoading from '@components/ui/table/TableLoading.svelte';
	import Pagination from '@components/ui/page/Pagination.svelte';

	export let __type: __Type;
	export let queryValue: string = null;
	const queryTypeConnection = operationStore('');
	const manager: TypeManager = new TypeManager();
	let pageSize: number = 10;
	$: queryTypeConnectionFieldName = manager.getQueryTypeConnectionFieldName(__type);
	$: fields = manager.getSingleTypeFiledList(__type);
	$: idFieldName = manager.getIdFieldName(__type);
	$: queryType(__type, pageSize, null, null);

	const queryType = (__type: __Type, pageSize: number, after: string, before: string) => {
		const variables = queryValue ? '($queryValue: String)' : '';
		const whereArguments = queryValue ? manager.getAllSingleTypeFiledQueryArguments(__type) : '';
		let pageArguments = '';
		if (after) {
			pageArguments = `after: "${after}" first: ${pageSize}`;
		} else if (before) {
			pageArguments = `before: "${before}" last: ${pageSize}`;
		} else {
			pageArguments = `first: ${pageSize}`;
		}
		let queryArguments = '';
		if (whereArguments || pageArguments) {
			queryArguments = `(${whereArguments} ${pageArguments})`;
		}
		const selections = fields.map((field) => field.name).join(' ');
		const graphql = `#graphql
        query ${variables}{
            ${queryTypeConnectionFieldName}${queryArguments}{
				edges {
					cursor
					node {
						${selections}
					}
				}
				pageInfo {
					hasNextPage
					hasPreviousPage
					startCursor
					endCursor
				}
            }
        }
        `;
		$queryTypeConnection.query = graphql;
		if (queryValue) {
			$queryTypeConnection.variables = { queryValue };
		}
		query(queryTypeConnection);
	};
	const onNext = (pageSize: number, after: string) => {
		queryType(__type, pageSize, after, null);
	};
	const onPrevious = (pageSize: number, before: string) => {
		queryType(__type, pageSize, null, before);
	};
	const onSizeChange = (pageSize: number) => {
		queryType(__type, pageSize, null, null);
	};
</script>

{#if $queryTypeConnection.fetching}
	<TableLoading />
{:else}
	<Table>
		<thead>
			<tr>
				{#each fields.map((__field) => __field.name) as name}
					<td>{name}</td>
				{/each}
				<td />
			</tr>
		</thead>
		<tbody>
			{#each manager.getListFromConnection($queryTypeConnection.data[queryTypeConnectionFieldName]) as data}
				<tr class="hover">
					{#each fields.map((__field) => __field.name) as name}
						<td>{data[name] ? data[name] : ''}</td>
					{/each}
					<td>
						<button
							class="btn btn-ghost btn-xs"
							on:click={(e) => {
								e.preventDefault();
								goto(`/types/${manager.typeNameToUrl(__type.name)}/${data[idFieldName]}`);
							}}
						>
							Edit
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
	<div class="divider" />
	<Pagination
		{onNext}
		{onPrevious}
		{onSizeChange}
		hasNextPage={$queryTypeConnection.data[queryTypeConnectionFieldName].pageInfo.hasNextPage}
		hasPreviousPage={$queryTypeConnection.data[queryTypeConnectionFieldName].pageInfo
			.hasPreviousPage}
		startCursor={$queryTypeConnection.data[queryTypeConnectionFieldName].pageInfo.startCursor}
		endCursor={$queryTypeConnection.data[queryTypeConnectionFieldName].pageInfo.endCursor}
	/>
{/if}
