<script lang="ts">
	import { goto } from '$app/navigation';
	import { gql } from 'graphql-request';
	import { client } from '$lib/graphql/GraphqlClient';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type } from '$lib/types/__Type';
	import { __TypeKind } from '$lib/types/__TypeKind';
	import { Form, FormItems, FormItem, FormButtons } from '$lib/components/ui/form';
	import FieldInput from './FieldInput.svelte';
	import { notifications } from '$lib/stores/Notifications';
	import LL from '$i18n/i18n-svelte';
	export let __type: __Type;

	const manager: TypeManager = new TypeManager();
	const idFieldName: string = manager.getIdFieldName(__type);
	const selections: string = manager.fieldsToSelections(__type);

	let data: object = manager.createTypeObject(__type);

	const save = (): void => {
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

		client
			.request(mutation, data)
			.then((res) => {
				notifications.success($LL.message.saveSuccess());
				goto(`../${manager.typeNameToUrl(__type.name)}/${res.data[idFieldName]}`);
			})
			.catch((error) => {
				notifications.error($LL.message.saveFailed());
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
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				goto(`../${manager.typeNameToUrl(__type.name)}`);
			}}
		>
			{$LL.components.graphql.editor.backBtn()}
		</button>
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				save();
			}}
		>
			{$LL.components.graphql.editor.saveBtn()}
		</button>
	</FormButtons>
</Form>
