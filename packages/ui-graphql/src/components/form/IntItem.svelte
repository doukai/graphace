<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import NumberItem from './NumberItem.svelte';

	export let value: number | (number | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<NumberItem bind:value {list} {name} {label} {error} {placeholder} {readonly} {disabled} />
