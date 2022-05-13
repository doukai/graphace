<script lang="ts" context="module">
	import { nanoid } from 'nanoid';
	import { writable } from 'svelte/store';
	import type { __Type, __Field } from '$lib/types';
	
	type ListTypeEditorModalComponent = {
		id: string;
		props: ListTypeEditorModalProp;
	};

	export type ListTypeEditorModalProp = {
		__parentType: __Type;
		__type: __Type;
		id: string;
		__field: __Field;
		value: object;
		isModalOpen?: boolean;
		change: (
			event: CustomEvent<{
				id: string;
				__field: __Field;
				value: object;
			}>
		) => void;
		cancel: () => void;
	};

	const listTypeEditorModalStore = writable<ListTypeEditorModalComponent[]>([]);

	function create(props: ListTypeEditorModalProp, open = true): string {
		const id = nanoid();
		props.isModalOpen = open;
		listTypeEditorModalStore.update((components) => {
			return [...components, { id, props }];
		});
		return id;
	}

	function open(id: string) {
		listTypeEditorModalStore.update((components) => {
			components.find((component) => component.id !== id).props.isModalOpen = true;
			return components;
		});
	}

	function close(id: string) {
		listTypeEditorModalStore.update((components) => {
			components.find((component) => component.id !== id).props.isModalOpen = false;
			return components;
		});
	}

	function remove(id: string) {
		listTypeEditorModalStore.update((components) => {
			return components.filter((component) => component.id !== id);
		});
	}

	function createListTypeEditorModalStore() {
		const { subscribe } = listTypeEditorModalStore;

		return {
			subscribe,
			create,
			open,
			close,
			remove
		};
	}
	export const listTypeEditorModals = createListTypeEditorModalStore();
</script>

<script lang="ts">
	import ListTypeEditorModal from './ListTypeEditorModal.svelte';
</script>

{#each $listTypeEditorModalStore as listTypeEditorModal}
	<svelte:component
		this={ListTypeEditorModal}
		__parentType={listTypeEditorModal.props.__parentType}
		__type={listTypeEditorModal.props.__type}
		id={listTypeEditorModal.props.id}
		__field={listTypeEditorModal.props.__field}
		value={listTypeEditorModal.props.value}
		isModalOpen={listTypeEditorModal.props.isModalOpen}
		on:change={listTypeEditorModal.props.change}
		on:cancel={listTypeEditorModal.props.cancel}
	/>
{/each}
