<script lang="ts">
	import type { __Type, __Field, __FieldFilter } from '$lib/types';
	import { getType } from '$lib/graphql/Introspection';
	import { __TypeKind } from '$lib/types';
	import { TableLoading } from '$lib/components/ui/table';
	import { Modal, ModalContent, ModalActions } from '$lib/components/ui/modal';
	import TypeTable from './TypeTable.svelte';
	import LL from '$i18n/i18n-svelte';
	export let isModalOpen = false;
	export let typeName: string;
	export let className: string = '';
	$: typePromise = getType(typeName);
	let idList: string[] = [];

	const selectChange = (event: CustomEvent<{ selectedIdList: string[] }>) => {
		idList = event.detail.selectedIdList;
		if (event.detail.selectedIdList.length > 0) {
		} else {
		}
	};
</script>

<Modal {isModalOpen} title={typeName} {className}>
	<ModalContent>
		<div class="bg-base-300 p-3 rounded-box">
			{#await typePromise}
				<TableLoading />
			{:then response}
				<TypeTable __type={response.__type} on:selectChange={selectChange} />
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
	</ModalActions>
</Modal>
