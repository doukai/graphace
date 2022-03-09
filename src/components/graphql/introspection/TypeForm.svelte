<script lang="ts">
	import { query, operationStore, mutation } from '@urql/svelte';
	import { TypeManager, type __Type, __TypeKind } from '$lib/TypeManager';
	import { goto } from '$app/navigation';
	import Input from '/src/components/types/Input.svelte';
	import Form from '/src/components/ui/form/Form.svelte';
	import FormItems from '/src/components/ui/form/FormItems.svelte';
	import FormItem from '/src/components/ui/form/FormItem.svelte';
	import FormButtons from '/src/components/ui/form/FormButtons.svelte';
	import Button from '/src/components/ui/Button.svelte';
	export let id: string;
	export let __type: __Type;

	const manager = new TypeManager();
	const queryTypeFieldName = manager.getQueryTypeFieldName(__type.name);
	const fields = __type.fields;

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
	query(queryData);

	$: data = $queryData.data;

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

	function save() {
		mutationType({ ...data[queryTypeFieldName] }).then((result) => {
			data[queryTypeFieldName] = result.data[mutationTypeFieldName];
		});
	}
</script>

{#if $queryData.fetching}
	Loading
{:else}
	<Form>
		<FormItems title={__type.name}>
			{#each __type.fields.filter((field) => !manager.fieldIsList(field.type) && manager.getFieldType(field.type) !== __TypeKind.OBJECT) as __field}
				<FormItem label={__field.name}>
					<Input {__field} bind:data={data[queryTypeFieldName][__field.name]} />
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
