<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import Select from './Select.svelte';
	export let value: any;
	export let enumName: string;

	const queryEnum = operationStore(
		`#graphql
		query ($enumName: ID) {
			__type(name:{val:$enumName}){
				name
                description
                enumValues{
                    name
                    description
                }
			}
		}`,
		{ enumName }
	);
	query(queryEnum);
</script>

{#if queryEnum.fetching}
	loading
{:else}
	<Select bind:value>
		{#each $queryEnum.data.__type.enumValues as enumValue}
			<option value={enumValue.name}>{enumValue.name}</option>
		{/each}
	</Select>
{/if}
