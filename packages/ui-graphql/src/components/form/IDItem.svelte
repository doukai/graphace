<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import StringItem from './StringItem.svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<StringItem bind:value {list} {name} {label} {error} {placeholder} {readonly} {disabled} />
