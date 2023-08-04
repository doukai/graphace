<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import NumberInput from './NumberInput.svelte';

	export let value: number | (number | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<NumberInput bind:value {list} {name} {errors} {placeholder} {readonly} {disabled} />
