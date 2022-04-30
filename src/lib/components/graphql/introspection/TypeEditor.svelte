<script lang="ts">
	import { goto } from '$app/navigation';
	import { queryType, mutationType, removeType } from '$lib/graphql/Type';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type } from '$lib/types/__Type';
	import { __TypeKind } from '$lib/types/__TypeKind';
	import { Form, FormLoading, FormItems, FormItem, FormButtons } from '$lib/components/ui/form';
	import FieldInput from './FieldInput.svelte';
	import { messageBox } from '$lib/stores/MessageBox';
	import { notifications } from '$lib/stores/Notifications';
	import LL from '$i18n/i18n-svelte';
	export let id: string;
	export let __type: __Type;

	const manager: TypeManager = new TypeManager();
	const queryPromise: Promise<{ data: object }> = queryType(__type, id);

	let data: object;
	queryPromise.then((res) => {
		data = res.data;
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
					messageBox.open({
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
