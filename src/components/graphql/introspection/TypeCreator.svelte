<script lang="ts">
	import { mutation } from '@urql/svelte';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type } from '$lib/__Type';
	import { __TypeKind } from '$lib/__TypeKind';
	import { goto } from '$app/navigation';
	import Form from '/src/components/ui/form/Form.svelte';
	import FormItems from '/src/components/ui/form/FormItems.svelte';
	import FormItem from '/src/components/ui/form/FormItem.svelte';
	import FormButtons from '/src/components/ui/form/FormButtons.svelte';
	import Button from '/src/components/ui/Button.svelte';
	import FieldInput from './FieldInput.svelte';
	export let __type: __Type;

	const manager = new TypeManager();

	const data = manager.createTypeObject(__type);
	const idFieldName = manager.getIdFieldName(__type);
	const selections = manager.fieldsToSelections(__type);
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
		mutationType({ ...data }).then((result) => {
			goto(
				`/types/${manager.typeNameToUrl(__type.name)}/${
					result.data[mutationTypeFieldName][idFieldName]
				}`
			);
		});
	};
</script>

<Form>
	<FormItems title={__type.name}>
		{#each manager.getSingleTypeFiledList(__type) as __field}
			<FormItem label={__field.name} forName={__field.name}>
				<FieldInput {__field} bind:value={data[__field.name]} />
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
