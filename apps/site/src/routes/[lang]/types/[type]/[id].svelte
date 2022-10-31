<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '@packages/graphql/TypeManager';
	const manager: TypeManager = new TypeManager();
	export const load: Load = async ({ params }) => {
		const { type, id } = params;
		return {
			props: {
				typeName: manager.urlToTypeName(type),
				id
			}
		};
	};
</script>

<script lang="ts">
	import { getType } from '@packages/graphql/request/Introspection';
	import type { __Type } from '@packages/graphql/types';
	import Section from '@packages/components/section/Section.svelte';
	import TypeEditor from '@packages/components-graphql/introspection/TypeEditor.svelte';
	import FormLoading from '@packages/components/form/FormLoading.svelte';
	import { TypeTableModals } from '@packages/components-graphql/introspection/table';
	import {
		TypeEditorModals,
		ListTypeEditorModals
	} from '@packages/components-graphql/introspection';
	import { notifications } from '@packages/components/Notifications.svelte';
	import LL from '../../../../i18n/i18n-svelte';
	export let typeName: string;
	export let id: string;

	let typePromise = getType(typeName);
</script>

<Section>
	{#await typePromise}
		<FormLoading />
	{:then response}
		<TypeEditor __type={response.__type} {id} />
	{:catch error}
		{notifications.error($LL.message.requestFailed())}
	{/await}
</Section>

<TypeEditorModals />
<ListTypeEditorModals />
<TypeTableModals />
