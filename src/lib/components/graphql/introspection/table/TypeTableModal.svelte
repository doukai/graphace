<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Type, __Field, __FieldFilter } from '$lib/types';
	import { __TypeKind } from '$lib/types';
	import { Modal, ModalContent, ModalActions } from '$lib/components/ui/modal';
	import TypeTable from './TypeTable.svelte';
	import LL from '$i18n/i18n-svelte';
	import { Pagination } from '$lib/components/ui/connection';
	export let __type: __Type;
	export let multiple: boolean = false;
	export let isModalOpen = false;

	const dispatch = createEventDispatcher<{
		select: {
			selectedDataList: object[];
		};
		cancel: {};
	}>();

	let dataList: object[] = [];

	const selectChange = (event: CustomEvent<{ selectedDataList: object[] }>) => {
		dataList = event.detail.selectedDataList;
	};
</script>

<Modal {isModalOpen} title={__type.name} className="max-w-6xl">
	<ModalContent>
		<div class="bg-base-300 p-2 rounded-box">
			<TypeTable {__type} on:selectChange={selectChange} className="table-compact">
				<div
					slot="page"
					let:pageNumber
					let:pageSize
					let:totalCount
					let:onPageChange
					let:onSizeChange
				>
					<Pagination
						{pageNumber}
						{pageSize}
						{totalCount}
						on:pageChange={onPageChange}
						on:sizeChange={onSizeChange}
					/>
				</div>
			</TypeTable>
		</div>
	</ModalContent>
	<ModalActions>
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				dispatch('cancel');
			}}
		>
			{$LL.components.graphql.editor.backBtn()}
		</button>
		{#if (multiple && dataList.length > 0) || dataList.length === 1}
			<button
				class="btn btn-primary"
				on:click={(e) => {
					e.preventDefault();
					dispatch('select', { selectedDataList: dataList });
				}}
			>
				{$LL.components.graphql.editor.selectBtn()}
			</button>
		{/if}
	</ModalActions>
</Modal>
