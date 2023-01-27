<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import StringItem from './StringItem.svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';
</script>

<StringItem bind:value {name} {label} {error} {placeholder} />
