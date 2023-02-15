<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import StringTd from './StringTd.svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<StringTd bind:value {list} {name} {error} {readonly} {disabled} {placeholder} on:save />
