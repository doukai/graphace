<script lang="ts">
	import { querySubType, mutationObjectField, removeObjectField } from '$lib/graphql/Type';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type, __FieldFilter, __Field } from '$lib/types';
	import { __TypeKind } from '$lib/types/__TypeKind';
	import { Modal, ModalContent, ModalActions } from '$lib/components/ui/modal';
	import FieldInput from './FieldInput.svelte';
	import { notifications } from '$lib/stores/Notifications';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PlusCircle } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let isModalOpen = false;
	export let __parentType: __Type;
	export let __type: __Type;
	export let id: string;
	export let __field: __Field;
	export let value: object;

	const manager: TypeManager = new TypeManager();
	let queryPromise: Promise<{ data: object }> = querySubType({
		__parentType,
		__type,
		id,
		__field
	});

	queryPromise.then((response) => {
		if (response.data) {
			value[__field.name] = response.data[__field.name];
			value[__field.from] = response.data[__field.from];
		}
	});

	const create = (): void => {
		value[__field.name] = manager.createTypeObject(__type);
	};

	const save = (): void => {
		mutationObjectField(__parentType, __type, id, __field, value[__field.name])
			.then((response) => {
				value[__field.name] = response.data[__field.name];
				value[__field.from] = response.data[__field.from];
				notifications.success($LL.message.saveSuccess());
			})
			.catch((error) => {
				notifications.error($LL.message.saveFailed());
			});
	};

	const remove = (): void => {
		removeObjectField(__parentType, __type, id, __field, value[__field.name])
			.then((response) => {
				value[__field.name] = response.data[__field.name];
				value[__field.from] = response.data[__field.from];
				notifications.success($LL.message.saveSuccess());
			})
			.catch((error) => {
				notifications.error($LL.message.saveFailed());
			});
	};
</script>

<Modal {isModalOpen} title={__type.name}>
	<ModalContent>
		<div class="py-4 px-4 sm:px-6 lg:px-8">
			{#await queryPromise then response}
				{#if response.data[__field.name]}
					<form>
						<div class="space-y-6 sm:space-y-5">
							{#each manager.getScalarFiledList(__type) as __subField}
								<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
									<div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
										<label for={__subField.name} class="block text-sm font-medium sm:mt-px sm:pt-2">
											{__subField.name}
										</label>
										<div class="mt-1 sm:mt-0 sm:col-span-2">
											<FieldInput
												className="w-full max-w-xs"
												__field={__subField}
												bind:value={value[__field.name][__subField.name]}
											/>
										</div>
									</div>
								</div>
								<div class="divider" />
							{/each}
						</div>
					</form>
				{:else}
					<button
						type="button"
						on:click={(e) => {
							create();
						}}
						class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<Icon src={PlusCircle} class="mx-auto h-12 w-12 text-gray-400" />
						<span class="mt-2 block text-sm font-medium text-gray-900">
							{$LL.components.graphql.editor.createType({ name: __type.name })}
						</span>
					</button>
				{/if}
			{:catch error}
				{notifications.error($LL.message.requestFailed())}
			{/await}
		</div>
	</ModalContent>
	<ModalActions>
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				isModalOpen = false;
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
				remove();
			}}
		>
			{$LL.components.graphql.editor.removeBtn()}
		</button>
	</ModalActions>
</Modal>
