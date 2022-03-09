<script lang="ts">
	import { query, operationStore, mutation } from '@urql/svelte';
	import { TypeManager, type __Type, __TypeKind } from '$lib/TypeManager';
	import { goto } from '$app/navigation';
	import Form from '/src/components/ui/form/Form.svelte';
	import FormLoading from '/src/components/ui/form/FormLoading.svelte';
	import FormItems from '/src/components/ui/form/FormItems.svelte';
	import FormItem from '/src/components/ui/form/FormItem.svelte';
	import FormButtons from '/src/components/ui/form/FormButtons.svelte';
	import Button from '/src/components/ui/Button.svelte';
	import FieldInput from './FieldInput.svelte';
	export let id: string = null;
	export let __type: __Type;

	const manager = new TypeManager();
	const queryTypeFieldName = manager.getQueryTypeFieldName(__type.name);
	const idFieldName = manager.getIdFieldName(__type.fields);
	const selections = manager.fieldsToSelections(__type);

	const queryData = operationStore(
		`#graphql
		query ($id: ID) {
			${queryTypeFieldName} (${idFieldName}: {val: $id}){
				${selections}
			}
		}`,
		{ id }
	);

	$: data = $queryData.data;
	$: if (id) {
		query(queryData);
	} else {
		data = {};
		data[queryTypeFieldName] = manager.createTypeObject(__type);
	}

	const mutationTypeFieldName = manager.getMutationTypeFieldName(__type.name);
	const mutationVariables = manager.fieldsToMutationVariables(__type);
	const mutationArguments = manager.fieldsToMutationArguments(__type);

	const mutationType = mutation({
		query: `#graphql
		mutation (${mutationVariables}) {
			${mutationTypeFieldName} (${mutationArguments}) {
				${selections}
			}
		}`
	});

	$: save = () => {
		debugger;
		mutationType({ ...data[queryTypeFieldName] }).then((result) => {
			if (!id) {
				goto(
					`/types/${manager.typeNameToUrl(__type.name)}/${
						result.data[mutationTypeFieldName][idFieldName]
					}`
				);
			} else {
				data[queryTypeFieldName] = result.data[mutationTypeFieldName];
			}
		});
	};
</script>

{#if id && $queryData.fetching}
	<FormLoading />
{:else}
	<Form>
		<FormItems title={__type.name}>
			{#each __type.fields.filter((field) => !manager.fieldIsList(field.type) && manager.getFieldType(field.type) !== __TypeKind.OBJECT) as __field}
				<FormItem label={__field.name} forName={__field.name}>
					<FieldInput {__field} bind:value={data[queryTypeFieldName][__field.name]} />
				</FormItem>
			{/each}
		</FormItems>
		<FormButtons>
			<Button
				on:click={(e) => {
					e.preventDefault();
					goto(`/types/${manager.typeNameToUrl(__type.name)}`);
				}}
			>
				Cancel
			</Button>
			<Button
				on:click={(e) => {
					e.preventDefault();
					save();
				}}
			>
				Save
			</Button>
		</FormButtons>
	</Form>
{/if}
