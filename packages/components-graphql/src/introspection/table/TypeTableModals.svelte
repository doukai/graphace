<script lang="ts" context="module">
	import { nanoid } from 'nanoid';
	import { writable } from 'svelte/store';
	import type { __Type } from '@packages/graphql/types';
	type TypeTableModalComponent = {
		id: string;
		props: TypeTableModalProp;
	};

	export type TypeTableModalProp = {
		__type: __Type;
		multiple?: boolean;
		isModalOpen?: boolean;
		select: (
			event: CustomEvent<{
				selectedDataList: object[];
			}>
		) => void;
		cancel: () => void;
	};

	const typeTableModalStore = writable<TypeTableModalComponent[]>([]);

	function create(props: TypeTableModalProp, open = true): string {
		const id = nanoid();
		props.isModalOpen = open;
		typeTableModalStore.update((components) => {
			return [...components, { id, props }];
		});
		return id;
	}

	function open(id: string) {
		typeTableModalStore.update((components) => {
			components.find((component) => component.id !== id).props.isModalOpen = true;
			return components;
		});
	}

	function close(id: string) {
		typeTableModalStore.update((components) => {
			components.find((component) => component.id !== id).props.isModalOpen = false;
			return components;
		});
	}

	function remove(id: string) {
		typeTableModalStore.update((components) => {
			return components.filter((component) => component.id !== id);
		});
	}

	function createTypeTableModalStore() {
		const { subscribe } = typeTableModalStore;

		return {
			subscribe,
			create,
			open,
			close,
			remove
		};
	}
	export const typeTableModals = createTypeTableModalStore();
</script>

<script lang="ts">
	import TypeTableModal from './TypeTableModal.svelte';
</script>

{#each $typeTableModalStore as typeTableModal}
	<svelte:component
		this={TypeTableModal}
		__type={typeTableModal.props.__type}
		multiple={typeTableModal.props.multiple}
		isModalOpen={typeTableModal.props.isModalOpen}
		on:select={typeTableModal.props.select}
		on:cancel={typeTableModal.props.cancel}
	/>
{/each}
