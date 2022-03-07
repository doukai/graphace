<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import { TypeManager, __TypeKind, type __Type } from '$lib/TypeManager';
	import { goto } from '$app/navigation';
	import Table from '/src/components/ui/table/Table.svelte';
	import Thead from '/src/components/ui/table/head/Thead.svelte';
	import Thr from '/src/components/ui/table/head/Thr.svelte';
	import Th from '/src/components/ui/table/head/Th.svelte';
	import Tbody from '/src/components/ui/table/body/Tbody.svelte';
	import Tr from '/src/components/ui/table/body/Tr.svelte';
	import Td from '/src/components/ui/table/body/Td.svelte';
	export let __type: __Type;

	const changeUrl = (url: string) => {
		goto(url, { keepfocus: true });
	};

	const manager: TypeManager = new TypeManager();
	const queryTypeListFieldName = manager.getQueryTypeListFieldName(__type.name);
	const fields = __type.fields.filter(
		(field) =>
			manager.getFieldType(field.type) === __TypeKind.SCALAR ||
			manager.getFieldType(field.type) === __TypeKind.ENUM
	);
	const idFieldName = manager.getIdFieldName(__type.fields);
	const selections = fields.map((field) => field.name).join(' ');

	const queryTypeList = operationStore(
		`#graphql
            query {
                ${queryTypeListFieldName}{
                    ${selections}
                }
            }
        `
	);
	query(queryTypeList);
</script>

<Table loading={$queryTypeList.fetching}>
	{#if $queryTypeList.data}
		<Thead>
			<Thr>
				{#each fields.map((__field) => __field.name) as name}
					<Th>{name}</Th>
				{/each}
			</Thr>
		</Thead>
		<Tbody>
			{#each $queryTypeList.data[queryTypeListFieldName] as data, rowIndex}
				<Tr {rowIndex}>
					{#each fields.map((__field) => __field.name) as name}
						<Td>{data[name] ? data[name] : ''}</Td>
					{/each}
				</Tr>
			{/each}
		</Tbody>
	{/if}
</Table>
