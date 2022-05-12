<script lang="ts" context="module">
	import { nanoid } from 'nanoid';
	import { writable } from 'svelte/store';
	import type { __Type, __Field } from '$lib/types';
	type TypeEditorModalComponent = {
		id: string;
		props: TypeEditorModalProp;
	};

	export type TypeEditorModalProp = {
		__parentType: __Type;
		__type: __Type;
		id: string;
		__field: __Field;
		value: object;
		isModalOpen?: boolean;
	};

	const typeEditorModalStore = writable<TypeEditorModalComponent[]>([]);

	function create(props: TypeEditorModalProp) {
		typeEditorModalStore.update((component) => {
			return [...component, { id: nanoid(), props }];
		});
	}

	function createTypeEditorModalStore() {
		const { subscribe } = typeEditorModalStore;

		return {
			subscribe,
			create,
			open: (props: TypeEditorModalProp) =>
				create({
					__parentType: props.__parentType,
					__type: props.__type,
					id: props.id,
					__field: props.__field,
					value: props.value,
					isModalOpen: true
				})
		};
	}
	export const typeEditorModals = createTypeEditorModalStore();
</script>

<script lang="ts">
	import TypeEditorModal from './TypeEditorModal.svelte';
</script>

{#each $typeEditorModalStore as typeEditorModal}
	<svelte:component
		this={TypeEditorModal}
		__parentType={typeEditorModal.props.__parentType}
		__type={typeEditorModal.props.__type}
		id={typeEditorModal.props.id}
		__field={typeEditorModal.props.__field}
		value={typeEditorModal.props.value}
		isModalOpen={typeEditorModal.props.isModalOpen}
	/>
{/each}
