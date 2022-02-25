<script lang="ts">
	import Thead from './Thead.svelte';
	import Tboday from './Tboday.svelte';
	import { getFieldType, __TypeKind, type __Type } from '$lib/TypeManager';
	export let __type: __Type;
	debugger;
</script>

<table class="min-w-full divide-y divide-gray-200">
	<Thead
		fields={__type.fields.filter(
			(field) =>
				getFieldType(field.type) === __TypeKind.SCALAR ||
				getFieldType(field.type) === __TypeKind.ENUM
		)}
	/>
	<Tboday {__type} />
</table>
