<script lang="ts">
	import { TypeManager } from '$lib/TypeManager';
	import {
		Input,
		NumberInput,
		InputList,
		NumberInputList,
		Toggle,
		ToggleList
	} from '$lib/components/ui/input';
	import EnumSelect from './EnumSelect.svelte';
	import type { __Field, Error } from '$lib/types';
	export let __field: __Field;
	export let value: any;
	export let error: Error;
	export let className: string = '';
	export let placeholder: string = '';
	const manager: TypeManager = new TypeManager();
	const fieldTypeName: string = manager.getFieldTypeName(__field.type);
</script>

{#if manager.fieldIsList(__field.type)}
	{#if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
		<NumberInputList {placeholder} {className} name={__field.name} bind:value />
	{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
		<InputList {placeholder} {className} name={__field.name} bind:value />
	{:else if fieldTypeName === 'Boolean'}
		<ToggleList name={__field.name} bind:value />
	{:else if manager.fieldIsEnum(__field.type)}
		<EnumSelect
			isList={true}
			name={__field.name}
			{className}
			__enumValues={manager.getFieldTypeEnumValues(__field.type)}
			bind:value
			{error}
		/>
	{/if}
{:else if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
	<NumberInput {placeholder} {className} name={__field.name} bind:value />
{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
	<Input {placeholder} {className} name={__field.name} bind:value {error} />
{:else if fieldTypeName === 'Boolean'}
	<Toggle name={__field.name} bind:value />
{:else if manager.fieldIsEnum(__field.type)}
	<EnumSelect
		name={__field.name}
		{className}
		__enumValues={manager.getFieldTypeEnumValues(__field.type)}
		bind:value
		{error}
	/>
{/if}
