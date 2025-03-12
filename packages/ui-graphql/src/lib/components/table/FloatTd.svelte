<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { IntTd } from '.';

	export let value: number | (number | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<IntTd bind:value {list} {errors} {readonly} {disabled} {zIndex} class={className} on:save />
