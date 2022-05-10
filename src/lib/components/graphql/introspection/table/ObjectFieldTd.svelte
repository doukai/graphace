<script lang="ts">
	import { TypeManager } from '$lib/TypeManager';
	import { getType } from '$lib/graphql/Introspection';
	import type { __Type, __Field, __FieldFilter } from '$lib/types';
	import TypeEditorModal from '$lib/components/graphql/introspection/TypeEditorModal.svelte';
	import { notifications } from '$lib/stores/Notifications';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Eye, Minus } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import ListTypeEditorModal from '../ListTypeEditorModal.svelte';
	export let __type: __Type;
	export let id: string;
	export let __field: __Field;
	export let value: object;
	let isModalOpen = false;
	let typePromise: Promise<{ __type: __Type }>;

	const manager: TypeManager = new TypeManager();
</script>

<td>
	<a
		class="group link inline-flex"
		href={null}
		on:click={(e) => {
			typePromise = getType(manager.getFieldTypeName(__field.type));
			isModalOpen = true;
		}}
	>
		{#if value[__field.from]}
			<Icon src={Eye} solid class="h-5 w-5" />
		{:else}
			<Icon src={Minus} solid class="h-5 w-5" />
		{/if}
	</a>
	{#if isModalOpen}
		{#await typePromise then response}
			{#if manager.fieldIsList(__field.type)}
				<ListTypeEditorModal
					{isModalOpen}
					__parentType={__type}
					__type={response.__type}
					{id}
					{__field}
					bind:value
				/>
			{:else}
				<TypeEditorModal
					{isModalOpen}
					__parentType={__type}
					__type={response.__type}
					{id}
					{__field}
					bind:value
				/>
			{/if}
		{:catch error}
			{notifications.error($LL.message.requestFailed())}
		{/await}
	{/if}
</td>
