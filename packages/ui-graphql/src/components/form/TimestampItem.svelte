<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import DateTimeItem from './DateTimeItem.svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<DateTimeItem bind:value {list} {name} {label} {error} {placeholder} {readonly} {disabled} />
