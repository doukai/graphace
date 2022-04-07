<script lang="ts">
	import { TypeManager } from '$lib/TypeManager';
	import Input from '@components/ui/input/Input.svelte';
	import NumberInput from '@components/ui/input/NumberInput.svelte';
	import Toggle from '@components/ui/input/Toggle.svelte';
	import EnumSelect from './EnumSelect.svelte';
	import type { __Field } from '$lib/types/__Field';
	export let __field: __Field;
	export let value: any;
	const manager = new TypeManager();
	const fieldTypeName = manager.getFieldTypeName(__field.type);
</script>

{#if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
	<NumberInput name={__field.name} bind:value />
{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
	<Input name={__field.name} bind:value />
{:else if fieldTypeName === 'Boolean'}
	<Toggle bind:value />
{:else if manager.fieldIsEnum(__field.type)}
	<EnumSelect enumName={manager.getFieldTypeName(__field.type)} bind:value />
{/if}
