<script lang="ts">
	import type { __EnumValue } from '$lib/types';
	import { Select, CheckboxGroup } from '$lib/components/ui/input';
	export let name: string;
	export let value: any;
	export let isList: boolean = false;
	export let __enumValues: __EnumValue[];
	export let className: string = '';
</script>

{#if isList}
	<CheckboxGroup
		bind:value
		checkboxs={__enumValues.map((enumValue) => {
			return { name: enumValue.name, value: enumValue.name };
		})}
	/>
{:else}
	<Select {name} {className} bind:value>
		{#each __enumValues as enumValue}
			<option value={enumValue.name}>{enumValue.name}</option>
		{/each}
	</Select>
{/if}
