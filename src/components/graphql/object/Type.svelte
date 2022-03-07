<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import { TypeManager, __TypeKind, type __Type } from '$lib/TypeManager';
	import { goto } from '$app/navigation';
	export let __type: __Type;

	const changeUrl = (url: string) => {
		goto(url, { keepfocus: true });
	};

	const manager: TypeManager = new TypeManager();
	const queryTypeListFieldName = manager.getQueryTypeListFieldName(__type.name);
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

	const queryTypeList = operationStore(
		`#graphql
            query {
                ${queryTypeListFieldName}{
                    ${selections}
                }
            }
        `
	);
    
	query(queryTypeList);
</script>
