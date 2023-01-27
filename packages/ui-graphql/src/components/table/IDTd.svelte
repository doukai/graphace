<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import StringTd from './StringTd.svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';
</script>

<StringTd bind:value {name} {error} {placeholder} on:save />
