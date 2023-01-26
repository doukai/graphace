<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import DateTimeTd from './DateTimeTd.svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';
</script>

<DateTimeTd {value} {name} {error} {placeholder} />
