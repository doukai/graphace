<script lang="ts">
	import Table from '/src/components/ui/table/Table.svelte';
	import Thead from '/src/components/ui/table/head/Thead.svelte';
	import Thr from '/src/components/ui/table/head/Thr.svelte';
	import Th from '/src/components/ui/table/head/Th.svelte';
	import Tbody from '/src/components/ui/table/body/Tbody.svelte';
	import Tr from '/src/components/ui/table/body/Tr.svelte';
	import Td from '/src/components/ui/table/body/Td.svelte';
	import type { __Field } from '$lib/TypeManager';

	export let loadingHead: boolean;
	export let loadingBody: boolean;
	export let __fieldList: __Field[];
	export let dataList: object[];
	debugger;
</script>

<Table>
	<Thead loading={loadingHead}>
		{#if !loadingHead}
			<Thr>
				{#each __fieldList.map((__field) => __field.name) as name}
					<Th>{name}</Th>
				{/each}
			</Thr>
		{/if}
	</Thead>
	<Tbody loading={loadingBody}>
		{#if !loadingBody}
			{#each dataList as data, rowIndex}
				{#each __fieldList.map((__field) => __field.name) as name}
					<Tr {rowIndex}>
						<Td>{data[name] ? data[name] : ''}</Td>
					</Tr>
				{/each}
			{/each}
		{/if}
	</Tbody>
</Table>
