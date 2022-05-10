<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		queryTypeConnection,
		mutationField,
		removeType,
		type QueryParams
	} from '$lib/graphql/Type';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type, __Field, __FieldFilter, Connection } from '$lib/types';
	import { getType } from '$lib/graphql/Introspection';
	import { __TypeKind } from '$lib/types';
	import { createFilter } from '$lib/types/__FieldFilter';
	import { Table, TableLoading } from '$lib/components/ui/table';
	import { Modal, ModalContent, ModalActions } from '$lib/components/ui/modal';
	import Pagination from '$lib/components/ui/connection/Pagination.svelte';
	import { FieldTh, FieldTd } from './';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilAlt, Trash } from '@steeze-ui/heroicons';
	import { notifications } from '$lib/stores/Notifications';
	import { messageBox } from '$lib/stores/MessageBox';
	import LL from '$i18n/i18n-svelte';
	import ObjectFieldTd from './ObjectFieldTd.svelte';
	import TypeTable from './TypeTable.svelte';
	export let isModalOpen = false;
	export let typeName: string;
	$: typePromise = getType(typeName);
	let idList: string[] = [];

	const selectChange = (event: CustomEvent<{ selectedIdList: string[] }>) => {
		idList = event.detail.selectedIdList;
		if (event.detail.selectedIdList.length > 0) {
		} else {
		}
	};
</script>

<Modal {isModalOpen} title={typeName}>
	{#await typePromise}
		<TableLoading />
	{:then response}
		<TypeTable __type={response.__type} on:selectChange={selectChange} />
	{/await}
</Modal>
