<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import DateTimeItem from './DateTimeItem.svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';
</script>

<DateTimeItem {value} {name} {label} {error} {placeholder} />
