<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { queryType, mutationType, removeType } from '@graphace/graphql/request/Type';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import { type __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import {
		Form,
		FormLoading,
		FormItems,
		FormItem,
		FormButtons
	} from '@graphace/ui/components/form';
	import { ObjectEditButton } from '.';
	import FieldInput from './FieldInput.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	export let id: string;
	export let __type: __Type;

	const dispatch = createEventDispatcher<{
		back: {};
	}>();

	const manager: TypeManager = new TypeManager();
	const queryPromise: Promise<{ data: object }> = queryType(__type, id);
	let errors: Record<string, Error> = {};

	let data: object;
	queryPromise.then((response) => {
		data = response.data;
	});

	const save = (): void => {
		validate(__type.name, data, $locale)
			.then((data) => {
				errors = {};
				mutationType(__type, data)
					.then((response) => {
						data = response.data;
						notifications.success($LL.message.saveSuccess());
					})
					.catch((error) => {
						notifications.error($LL.message.saveFailed());
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const remove = (): void => {
		removeType(__type, id)
			.then((response) => {
				notifications.success($LL.message.removeSuccess());
				dispatch('back');
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
						<FieldInput
							className="w-full max-w-xs"
							{__field}
							bind:value={data[__field.name]}
							error={errors[__field.name]}
						/>
					{/if}
				</FormItem>
			{/each}
		</FormItems>
		<FormButtons>
			<button
				class="btn"
				on:click={(e) => {
					e.preventDefault();
					dispatch('back');
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
