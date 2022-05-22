<script lang="ts">
	import { goto } from '$app/navigation';
	import { queryType, mutationType, removeType } from '$lib/graphql/Type';
	import { TypeManager } from '$lib/TypeManager';
	import { type __Type, __TypeKind } from '$lib/types';
	import { Form, FormLoading, FormItems, FormItem, FormButtons } from '$lib/components/ui/form';
	import { ObjectEditButton } from '$lib/components/graphql/introspection';
	import FieldInput from './FieldInput.svelte';
	import { messageBoxs } from '$lib/components/ui/MessageBoxs.svelte';
	import { notifications } from '$lib/components/ui/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	export let id: string;
	export let __type: __Type;

	const manager: TypeManager = new TypeManager();
	const queryPromise: Promise<{ data: object }> = queryType(__type, id);

	let data: object;
	queryPromise.then((response) => {
		data = response.data;
	});

	const save = (): void => {
		mutationType(__type, data)
			.then((response) => {
				data = response.data;
				notifications.success($LL.message.saveSuccess());
			})
			.catch((error) => {
				notifications.error($LL.message.saveFailed());
			});
	};

	const remove = (): void => {
		removeType(__type, id)
			.then((response) => {
				notifications.success($LL.message.removeSuccess());
				goto(`../${manager.typeNameToUrl(__type.name)}`);
			})
			.catch((error) => {
				notifications.error($LL.message.removeFailed());
			});
	};
</script>

{#await queryPromise}
	<FormLoading />
{:then response}
	<Form>
		<FormItems title={__type.name}>
			{#each manager.getFiledList(__type) as __field}
				<FormItem label={__field.name} forName={__field.name}>
					{#if manager.getFieldTypeKind(__field.type) === __TypeKind.OBJECT}
						<ObjectEditButton
							__parentType={__type}
							{__field}
							{id}
							bind:value={data}
							className="btn-outline"
						/>
					{:else}
						<FieldInput className="w-full max-w-xs" {__field} bind:value={data[__field.name]} />
					{/if}
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
					messageBoxs.open({
						title: $LL.components.graphql.table.removeModalTitle(),
						buttonName: $LL.components.graphql.table.removeBtn(),
						buttonType: 'error',
						confirm: () => {
							remove();
							return true;
						}
					});
				}}
			>
				{$LL.components.graphql.editor.removeBtn()}
			</button>
		</FormButtons>
	</Form>
{:catch error}
	{notifications.error($LL.message.requestFailed())}
{/await}
