<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import NumberItem from './NumberItem.svelte';

	export let value: number | (number | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';
</script>

<NumberItem {value} {name} {label} {error} {placeholder} />
