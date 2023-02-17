<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { FormItem } from '@graphace/ui/components/form';
	import { Toggle, ToggleList } from '@graphace/ui/components/input';

	export let value: boolean | (boolean | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let readonly = false;
	export let disabled = false;
	export let errors: Errors | undefined = undefined;
</script>

<FormItem {label} let:id>
	{#if Array.isArray(value) || (list && (value === null || value === undefined))}
		<ToggleList {id} {name} bind:value {errors} {readonly} {disabled} />
	{:else}
		<Toggle {id} {name} bind:value {errors} {readonly} {disabled} />
	{/if}
</FormItem>
