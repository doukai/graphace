<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormControl, Input, InputList } from '@graphace/ui';

	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormControl let:id {errors}>
	{#if list}
		<InputList {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} />
	{:else}
		<Input {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} />
	{/if}
</FormControl>
