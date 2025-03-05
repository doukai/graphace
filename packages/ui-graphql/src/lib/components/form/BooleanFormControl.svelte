<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormControl, Toggle, ToggleList } from '@graphace/ui';

	export let value: boolean | (boolean | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let readonly = false;
	export let disabled = false;
	export let errors: Errors | undefined = undefined;
</script>

<FormControl let:id>
	{#if list}
		<ToggleList {id} {name} bind:value {errors} {readonly} {disabled} />
	{:else}
		<Toggle {id} {name} bind:value {errors} {readonly} {disabled} />
	{/if}
</FormControl>
