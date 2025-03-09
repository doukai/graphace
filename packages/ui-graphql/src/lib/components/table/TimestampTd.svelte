<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { DateTimeTd } from '.';

	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<DateTimeTd bind:value {list} {errors} {readonly} {disabled} {zIndex} class={className} on:save />
