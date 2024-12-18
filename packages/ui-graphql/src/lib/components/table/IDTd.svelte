<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { StringTd } from '.';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<StringTd bind:value {list} {name} {errors} {readonly} {disabled} {placeholder} on:save />
