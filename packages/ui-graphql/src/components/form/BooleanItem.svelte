<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { FormItem } from '@graphace/ui/components/form';
	import { Toggle, ToggleList } from '@graphace/ui/components/input';

	export let value: boolean | (boolean | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
</script>

<FormItem {label} let:id>
	{#if Array.isArray(value)}
		<ToggleList {id} {name} bind:value {error} />
	{:else}
		<Toggle {id} {name} bind:value {error} />
	{/if}
</FormItem>
