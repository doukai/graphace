<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import { TypeManager, __TypeKind, type __Type } from '$lib/TypeManager';
	import Form from './Form.svelte';
	export let __type: __Type;
	export let id: string;

	const manager: TypeManager = new TypeManager();
	const queryTypeFieldName = manager.getQueryTypeFieldName(__type.name);
	const fields = __type.fields;

	const idFieldName = manager.getIdFieldName(__type.fields);
	const selections = fields
		.filter(
			(field) =>
				manager.getFieldType(field.type) === __TypeKind.SCALAR ||
				manager.getFieldType(field.type) === __TypeKind.ENUM
		)
		.map((field) => field.name)
		.join(' ');

	const queryType = operationStore(
		`#graphql
		query ($id: ID) {
			${queryTypeFieldName} (${idFieldName}: {val: $id}){
				${selections}
			}
		}`,
		{ id }
	);
	query(queryType);
</script>

{#if $queryType.fetching}
	loading
{:else}
	<Form data={$queryType.data[queryTypeFieldName]} {__type} />
{/if}
