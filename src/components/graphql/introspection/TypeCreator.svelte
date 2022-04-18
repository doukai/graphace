<script lang="ts">
	import { goto } from '$app/navigation';
	import { gql } from 'graphql-request';
	import { client } from '$lib/GraphqlClient';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type } from '$lib/types/__Type';
	import { __TypeKind } from '$lib/types/__TypeKind';
	import Form from '@components/ui/form/Form.svelte';
	import FormItems from '@components/ui/form/FormItems.svelte';
	import FormItem from '@components/ui/form/FormItem.svelte';
	import FormButtons from '@components/ui/form/FormButtons.svelte';
	import FieldInput from './FieldInput.svelte';
	export let __type: __Type;

	const manager: TypeManager = new TypeManager();
	const idFieldName: string = manager.getIdFieldName(__type);
	const selections: string = manager.fieldsToSelections(__type);

	let data: object = manager.createTypeObject(__type);

	const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
	const mutationVariables: string = manager.fieldsToMutationVariables(__type);
	const mutationArguments: string = manager.fieldsToMutationArguments(__type);

	const mutation: string = gql`
		mutation (${mutationVariables}) {
			data: ${mutationTypeFieldName} (${mutationArguments}) {
				${selections}
			}
		}	
	`;

	const save = (): void => {
		client.request(mutation, data).then((res) => {
			goto(`/types/${manager.typeNameToUrl(__type.name)}/${res.data[idFieldName]}`);
		});
	};
</script>

<Form>
	<FormItems title={__type.name}>
		{#each manager.getSingleTypeFiledList(__type) as __field}
			<FormItem label={__field.name} forName={__field.name}>
				<FieldInput className="w-full max-w-xs" {__field} bind:value={data[__field.name]} />
			</FormItem>
		{/each}
	</FormItems>
	<FormButtons>
		<button
			class="ml-3 btn"
			on:click={(e) => {
				e.preventDefault();
				goto(`/types/${manager.typeNameToUrl(__type.name)}`);
			}}
		>
			Cancel
		</button>
		<button
			class="ml-3 btn"
			on:click={(e) => {
				e.preventDefault();
				save();
			}}
		>
			Save
		</button>
	</FormButtons>
</Form>
