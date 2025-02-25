<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { StringItem } from '.';

	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<StringItem bind:value {list} {name} {label} {errors} {placeholder} {readonly} {disabled} />
