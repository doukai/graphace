<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Toggle, ToggleList } from '@graphace/ui';

	export let value: boolean | (boolean | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let readonly = false;
	export let disabled = false;
	export let errors: Errors | undefined = undefined;
	export let className: string = '';
	export let addBtnClassName: string = '';
</script>

{#if list}
	<ToggleList
		{name}
		bind:value
		{errors}
		{readonly}
		{disabled}
		{className}
		{addBtnClassName}
		on:change
	/>
{:else}
	<Toggle {name} bind:value {errors} {readonly} {disabled} {className} on:change />
{/if}
