<script lang="ts">
	import { goto } from '$app/navigation';
	import { gql } from 'graphql-request';
	import { client } from '$lib/GraphqlClient';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type } from '$lib/types/__Type';
	import { __TypeKind } from '$lib/types/__TypeKind';
	import Form from '@components/ui/form/Form.svelte';
	import FormLoading from '@components/ui/form/FormLoading.svelte';
	import FormItems from '@components/ui/form/FormItems.svelte';
	import FormItem from '@components/ui/form/FormItem.svelte';
	import FormButtons from '@components/ui/form/FormButtons.svelte';
	import FieldInput from './FieldInput.svelte';
	export let id: string;
	export let __type: __Type;

	const manager: TypeManager = new TypeManager();
	const queryTypeFieldName: string = manager.getQueryTypeFieldName(__type);
	const idFieldName: string = manager.getIdFieldName(__type);
	const selections: string = manager.fieldsToSelections(__type);

	const graphql: string = gql`
		query ($id: ID) {
			data: ${queryTypeFieldName} (${idFieldName}: {val: $id}){
				${selections}
			}
		}
	`;

	type Response = { data: object };
	const queryData: Promise<Response> = client.request<Response>(graphql, { id });

	let data: object;
	queryData.then((res) => {
		data = res.data;
	});

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
			data = res.data;
		});
	};
</script>

{#await queryData}
	<FormLoading />
{:then response}
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
{/await}
