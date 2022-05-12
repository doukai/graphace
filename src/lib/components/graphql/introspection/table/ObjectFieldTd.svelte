<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		typeEditorModals,
		type TypeEditorModalProp
	} from '$lib/components/graphql/introspection/TypeEditorModals.svelte';
	import { TypeManager } from '$lib/TypeManager';
	import { getType } from '$lib/graphql/Introspection';
	import type { __Type, __Field, __FieldFilter } from '$lib/types';
	import TypeEditorModal from '$lib/components/graphql/introspection/TypeEditorModal.svelte';
	import ListTypeEditorModal from '$lib/components/graphql/introspection/ListTypeEditorModal.svelte';
	import { notifications } from '$lib/stores/Notifications';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Eye, Minus } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let __parentType: __Type;
	export let id: string;
	export let __field: __Field;
	export let value: object;
	const manager: TypeManager = new TypeManager();

	const dispatch = createEventDispatcher<{
		editTypeField: {
			id: string;
			__field: __Field;
			value: object;
		};
	}>();
</script>

<td>
	<a
		class="group link inline-flex"
		href={null}
		on:click={(e) => {
			// dispatch('editTypeField', { id, __field, value });
			getType(manager.getFieldTypeName(__field.type)).then((response) => {
				typeEditorModals.open({ __parentType, __type: response.__type, id, __field, value });
			});
		}}
	>
		{#if value[__field.from]}
			<Icon src={Eye} solid class="h-5 w-5" />
		{:else}
			<Icon src={Minus} solid class="h-5 w-5" />
		{/if}
	</a>
</td>
