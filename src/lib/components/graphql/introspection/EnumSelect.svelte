<script lang="ts">
	import type { __EnumValue, Error } from '$lib/types';
	import { Select, CheckboxGroup } from '$lib/components/ui/input';
	export let name: string;
	export let value: any;
	export let __enumValues: __EnumValue[];
	export let className: string = '';
	export let error: Error = null;
</script>

<Select {name} {className} bind:value {error}>
	{#each __enumValues as enumValue}
		<option value={enumValue.name}>{enumValue.name}</option>
	{/each}
</Select>
