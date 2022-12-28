<script lang="ts">
	import { FormItem } from '@graphace/ui/components/form';
	import { Input, InputList } from '@graphace/ui/components/input';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';
</script>

<FormItem label="name" let:id>
	{#if Array.isArray(value)}
		<InputList {placeholder} {name} bind:value {error} />
	{:else}
		<Input {placeholder} {name} bind:value {error} />
	{/if}
</FormItem>
