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

	if (!value[__field.name]) {
		value[__field.name] = [];
	}

	let queryPromise: Promise<{ data: object }> = querySubType({
		__parentType,
		__type,
		id,
		__field
	});

	queryPromise.then((response) => {
		value[__field.name] = response.data[__field.name];
		value[__field.from] = response.data[__field.from];
	});

	const createItem = (): void => {
		if (!value[__field.name]) {
			value[__field.name] = [];
		}
		value[__field.name] = [...value[__field.name], manager.createTypeObject(__type)];
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

<Modal {isModalOpen} title={__field.name}>
	<ModalContent>
		<div class="py-4 px-4 sm:px-6 lg:px-8 space-y-4">
			{#await queryPromise}
				{#each { length: 6 } as _}
					<div class="animate-pulse bg-base-200 px-12 py-12 sm:mt-px sm:pt-2 rounded" />
					<div class="divider" />
				{/each}
			{:then response}
				{#each value[__field.name] || [] as data}
					<div
						tabindex="0"
						class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
					>
						<input type="checkbox" class="peer" />
						<div class="collapse-title">
							{data[manager.getNameFiled(__type).name] ||
								$LL.components.graphql.editor.newType({ name: __type.name })}
						</div>
						<div class="collapse-content">
							<form>
								<div class="space-y-6 sm:space-y-5">
									{#each manager.getScalarFiledList(__type) as __subField}
										<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
											<div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
												<label
													for={__subField.name}
													class="block text-sm font-medium sm:mt-px sm:pt-2"
												>
													{__subField.name}
												</label>
												<div class="mt-1 sm:mt-0 sm:col-span-2">
													<FieldInput
														className="w-full max-w-xs"
														__field={__subField}
														bind:value={data[__subField.name]}
													/>
												</div>
											</div>
										</div>
										<div class="divider" />
									{/each}
								</div>
							</form>
						</div>
					</div>
				{/each}
				<button
					type="button"
					class="relative block w-full border-2 bg-base-100 border-dashed rounded-lg p-6 text-center hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-base-300"
					on:click={(e) => {
						createItem();
					}}
				>
					<Icon src={PlusCircle} class="mx-auto h-12 w-12" />
					<span class="mt-2 block text-sm font-medium">
						{$LL.components.graphql.editor.createType({ name: __type.name })}
					</span>
				</button>
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
