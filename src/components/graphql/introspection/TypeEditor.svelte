<script lang="ts">
	import { query, operationStore, mutation } from '@urql/svelte';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type } from '$lib/__Type';
	import { __TypeKind } from '$lib/__TypeKind';
	import { goto } from '$app/navigation';
	import Form from '/src/components/ui/form/Form.svelte';
	import FormLoading from '/src/components/ui/form/FormLoading.svelte';
	import FormItems from '/src/components/ui/form/FormItems.svelte';
	import FormItem from '/src/components/ui/form/FormItem.svelte';
	import FormButtons from '/src/components/ui/form/FormButtons.svelte';
	import Button from '/src/components/ui/Button.svelte';
	import FieldInput from './FieldInput.svelte';
	export let id: string;
	export let __type: __Type;

	const manager = new TypeManager();
	const queryTypeFieldName = manager.getQueryTypeFieldName(__type);
	const idFieldName = manager.getIdFieldName(__type);
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
	query(queryData);

	const mutationTypeFieldName = manager.getMutationTypeFieldName(__type);
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

	const save = () => {
		mutationType({ ...data[queryTypeFieldName] }).then((result) => {
			data[queryTypeFieldName] = result.data[mutationTypeFieldName];
		});
	};
</script>

{#if $queryData.fetching}
	<FormLoading />
{:else}
	<Form>
		<FormItems title={__type.name}>
			{#each manager.getSingleTypeFiledList(__type) as __field}
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
