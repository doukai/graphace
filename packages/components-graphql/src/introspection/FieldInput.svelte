<script lang="ts">
	import { TypeManager } from '@packages/graphql/TypeManager';
	import {
		Input,
		NumberInput,
		InputList,
		NumberInputList,
		Toggle,
		ToggleList
	} from '@packages/components/input';
	import { EnumSelect, EnumCheckboxGroup } from '.';
	import type { __Field } from '@packages/graphql/types';
	import type { Error } from '@packages/common/types';
	export let __field: __Field;
	export let value: any;
	export let error: Error = null;
	export let className: string = '';
	export let placeholder: string = '';
	const manager: TypeManager = new TypeManager();
	const fieldTypeName: string = manager.getFieldTypeName(__field.type);
</script>

{#if manager.fieldIsList(__field.type)}
	{#if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
		<NumberInputList {placeholder} {className} name={__field.name} bind:value {error} />
	{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
		<InputList {placeholder} {className} name={__field.name} bind:value {error} />
	{:else if fieldTypeName === 'Boolean'}
		<ToggleList name={__field.name} bind:value {error} />
	{:else if manager.fieldIsEnum(__field.type)}
		<EnumCheckboxGroup
			__enumValues={manager.getFieldTypeEnumValues(__field.type)}
			bind:value
			{error}
		/>
	{/if}
{:else if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
	<NumberInput {placeholder} {className} name={__field.name} bind:value {error} />
{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
	<Input {placeholder} {className} name={__field.name} bind:value {error} />
{:else if fieldTypeName === 'Boolean'}
	<Toggle name={__field.name} bind:value {error} />
{:else if manager.fieldIsEnum(__field.type)}
	<EnumSelect
		name={__field.name}
		{className}
		__enumValues={manager.getFieldTypeEnumValues(__field.type)}
		bind:value
		{error}
	/>
{/if}
