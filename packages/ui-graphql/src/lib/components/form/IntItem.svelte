<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { NumberItem } from '.';

	export let value: number | (number | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<NumberItem bind:value {list} {name} {label} {errors} {placeholder} {readonly} {disabled} />
