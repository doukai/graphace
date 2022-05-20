<script lang="ts">
	import { goto } from '$app/navigation';
	import { mutationType } from '$lib/graphql/Type';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type } from '$lib/types';
	import { Form, FormItems, FormItem, FormButtons } from '$lib/components/ui/form';
	import FieldInput from './FieldInput.svelte';
	import { notifications } from '$lib/components/ui/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	export let __type: __Type;

	const manager: TypeManager = new TypeManager();
	const idFieldName: string = manager.getIdFieldName(__type);

	let data: object = manager.createTypeObject(__type);

	const save = (): void => {
		mutationType(__type, data)
			.then((response) => {
				notifications.success($LL.message.saveSuccess());
				goto(`../${manager.typeNameToUrl(__type.name)}/${response.data[idFieldName]}`);
			})
			.catch((error) => {
				notifications.error($LL.message.saveFailed());
			});
	};
</script>

<Form>
	<FormItems title={__type.name}>
		{#each manager.getScalarFiledList(__type) as __field}
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
