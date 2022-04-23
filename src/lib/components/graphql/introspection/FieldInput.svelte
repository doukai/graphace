<script lang="ts">
	import { TypeManager } from '$lib/TypeManager';
	import Input from '$lib/components/ui/input/Input.svelte';
	import NumberInput from '$lib/components/ui/input/NumberInput.svelte';
	import Toggle from '$lib/components/ui/input/Toggle.svelte';
	import EnumSelect from './EnumSelect.svelte';
	import type { __Field } from '$lib/types/__Field';
	export let __field: __Field;
	export let value: string | number | boolean | null;
	export let className: string = '';
	export let placeholder: string = '';
	const manager: TypeManager = new TypeManager();
	const fieldTypeName: string = manager.getFieldTypeName(__field.type);
</script>

{#if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
	<NumberInput {placeholder} {className} name={__field.name} bind:value />
{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
	<Input {placeholder} {className} name={__field.name} bind:value />
{:else if fieldTypeName === 'Boolean'}
	<Toggle name={__field.name} bind:value />
{:else if manager.fieldIsEnum(__field.type)}
	<EnumSelect
		name={__field.name}
		{className}
		enumName={manager.getFieldTypeName(__field.type)}
		bind:value
	/>
{/if}
