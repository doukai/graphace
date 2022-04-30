<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '$lib/TypeManager';
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
	import { getType } from '$lib/graphql/Introspection';
	import type { __Type } from '$lib/types/__Type';
	import Section from '$lib/components/ui/section/Section.svelte';
	import TypeEditor from '$lib/components/graphql/introspection/TypeEditor.svelte';
	import FormLoading from '$lib/components/ui/form/FormLoading.svelte';
	export let typeName: string;
	export let id: string;

	let typePromise = getType(typeName);
</script>

<Section>
	{#await typePromise}
		<FormLoading />
	{:then response}
		<TypeEditor __type={response.__type} {id} />
	{/await}
</Section>
