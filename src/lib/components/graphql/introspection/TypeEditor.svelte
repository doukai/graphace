<script lang="ts">
	import { goto } from '$app/navigation';
	import { gql } from 'graphql-request';
	import { client } from '$lib/graphql/GraphqlClient';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type } from '$lib/types/__Type';
	import { __TypeKind } from '$lib/types/__TypeKind';
	import { Form, FormLoading, FormItems, FormItem, FormButtons } from '$lib/components/ui/form';
	import FieldInput from './FieldInput.svelte';
	import { Modal, ModalActions } from '$lib/components/ui/modal';
	import { notifications } from '$lib/stores/Notifications';
	import LL from '$i18n/i18n-svelte';
	export let id: string;
	export let __type: __Type;

	let deleteModelOpen: boolean = false;

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
				data = res.data;
				notifications.success($LL.message.saveSuccess());
			})
			.catch((error) => {
				notifications.error($LL.message.saveFailed());
			});
	};

	const remove = (): void => {
		const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
		const idFieldName: string = manager.getIdFieldName(__type);

		const mutation: string = gql`
			mutation ($id: String){
				data: ${mutationTypeFieldName} (${idFieldName}: $id isDeprecated: true) @update {
					${idFieldName}
				}
			}	
		`;

		client
			.request<{ data: object }>(mutation, { id })
			.then((res) => {
				notifications.success($LL.message.deleteSuccess());
				goto(`../${manager.typeNameToUrl(__type.name)}`);
			})
			.catch((error) => {
				notifications.error($LL.message.deleteFailed());
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
			<button
				class="btn btn-outline btn-error"
				on:click={(e) => {
					e.preventDefault();
					deleteModelOpen = true;
				}}
			>
				{$LL.components.graphql.editor.deleteBtn()}
			</button>
		</FormButtons>
	</Form>
{:catch error}
	{notifications.error($LL.message.requestFailed())}
{/await}

<Modal isModalOpen={deleteModelOpen} title={$LL.components.graphql.table.deleteModalTitle()}>
	<ModalActions>
		<button class="btn" on:click={() => (deleteModelOpen = false)}>
			{$LL.components.graphql.table.cancelBtn()}
		</button>
		<button class="btn btn-outline btn-error" on:click={() => remove()}>
			{$LL.components.graphql.table.deleteBtn()}
		</button>
	</ModalActions>
</Modal>
