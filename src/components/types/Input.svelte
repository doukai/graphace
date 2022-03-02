<script lang="ts">
	import { TypeManager, type __Field } from '$lib/TypeManager';
	export let __field: __Field;
	export let data: object;
	const manager = new TypeManager();
	const fieldTypeName = manager.getFieldTypeName(__field.type);
</script>

{#if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
	<input
		type="number"
		name={__field.name}
		class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
		bind:value={data}
	/>
{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
	<input
		type="text"
		name={__field.name}
		class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
		bind:value={data}
	/>
{:else if fieldTypeName === 'Boolean'}
	<input
		type="checkbox"
		name={__field.name}
		class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
		bind:value={data}
	/>
{/if}
