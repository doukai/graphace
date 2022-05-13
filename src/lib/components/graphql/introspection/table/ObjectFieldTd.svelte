<script lang="ts">
	import { typeEditorModals } from '$lib/components/graphql/introspection/TypeEditorModals.svelte';
	import { listTypeEditorModals } from '$lib/components/graphql/introspection/ListTypeEditorModals.svelte';
	import { TypeManager } from '$lib/TypeManager';
	import { getType } from '$lib/graphql/Introspection';
	import type { __Type, __Field, __FieldFilter } from '$lib/types';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Eye, Minus } from '@steeze-ui/heroicons';
	export let __parentType: __Type;
	export let __field: __Field;
	export let id: string;
	export let value: object;
	const manager: TypeManager = new TypeManager();
</script>

<td>
	<a
		class="group link inline-flex"
		href={null}
		on:click={(e) => {
			getType(manager.getFieldTypeName(__field.type)).then((response) => {
				if (manager.fieldIsList(__field.type)) {
					const modalId = listTypeEditorModals.create({
						__parentType,
						__type: response.__type,
						id,
						__field,
						value,
						change: (event) => {
							value[__field.name] = event.detail.value[__field.name];
							value[__field.from] = event.detail.value[__field.from];
							listTypeEditorModals.remove(modalId);
						},
						cancel: () => {
							listTypeEditorModals.remove(modalId);
						}
					});
				} else {
					const modalId = typeEditorModals.create({
						__parentType,
						__type: response.__type,
						id,
						__field,
						value,
						change: (event) => {
							value[__field.name] = event.detail.value[__field.name];
							value[__field.from] = event.detail.value[__field.from];
							typeEditorModals.remove(modalId);
						},
						cancel: () => {
							typeEditorModals.remove(modalId);
						}
					});
				}
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
