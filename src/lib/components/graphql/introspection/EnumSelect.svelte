<script lang="ts">
	import type { __EnumValue, Error } from '$lib/types';
	import { Select, CheckboxGroup } from '$lib/components/ui/input';
	export let name: string;
	export let value: any;
	export let isList: boolean = false;
	export let __enumValues: __EnumValue[];
	export let className: string = '';
	export let error: Error;
</script>

{#if isList}
	<CheckboxGroup
		bind:value
		checkboxs={__enumValues.map((enumValue) => {
			return { name: enumValue.name, value: enumValue.name };
		})}
	/>
{:else}
	<div class="form-control w-full max-w-xs">
		<Select {name} className={error ? 'select-error ' : '' + className} bind:value>
			{#each __enumValues as enumValue}
				<option value={enumValue.name}>{enumValue.name}</option>
			{/each}
		</Select>
		{#if error}
			<label for="" class="label">
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			</label>
		{/if}
	</div>
{/if}
