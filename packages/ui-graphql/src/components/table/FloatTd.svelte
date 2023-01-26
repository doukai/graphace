<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import NumberTd from './NumberTd.svelte';

	export let value: number | (number | null | undefined)[] | null | undefined;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';
</script>

<NumberTd {value} {name} {error} {placeholder} />
