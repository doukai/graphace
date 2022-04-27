<script lang="ts">
	import type { __Type, __EnumValue } from '$lib/types';
	import Select from '$lib/components/ui/input/Select.svelte';
	export let name: string;
	export let value: string | number | boolean | null;
	export let __enumValues: __EnumValue[];
	export let className: string = '';
</script>

<Select {name} {className} bind:value>
	{#each __enumValues as enumValue}
		<option value={enumValue.name}>{enumValue.name}</option>
	{/each}
</Select>
