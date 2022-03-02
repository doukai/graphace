<script lang="ts">
	import Thead from './Thead.svelte';
	import Tboday from './Tboday.svelte';
	import { TypeManager, __TypeKind, type __Type } from '$lib/TypeManager';
	export let __type: __Type;
	const manager: TypeManager = new TypeManager();
</script>

<table class="min-w-full divide-y divide-gray-200">
	<Thead
		fields={__type.fields.filter(
			(field) =>
				!manager.fieldIsList(field.type) && manager.getFieldType(field.type) !== __TypeKind.OBJECT
		)}
	/>
	<Tboday {__type} />
</table>
