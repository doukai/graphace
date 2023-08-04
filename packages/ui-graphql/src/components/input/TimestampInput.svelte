<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import DateTimeInput from './DateTimeInput.svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<DateTimeInput bind:value {list} {name} {errors} {placeholder} {readonly} {disabled} />
