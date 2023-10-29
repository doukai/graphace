<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Toggle, ToggleList } from '@graphace/ui';

	export let value: boolean | (boolean | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let readonly = false;
	export let disabled = false;
	export let errors: Errors | undefined = undefined;
</script>

{#if Array.isArray(value) || (list && (value === null || value === undefined))}
	<ToggleList {name} bind:value {errors} {readonly} {disabled} />
{:else}
	<Toggle {name} bind:value {errors} {readonly} {disabled} />
{/if}
