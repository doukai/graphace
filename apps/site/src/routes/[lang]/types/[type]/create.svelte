<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '@packages/graphql/TypeManager';
	const manager = new TypeManager();
	export const load: Load = async ({ params }) => {
		const { type } = params;
		return {
			props: {
				typeName: manager.urlToTypeName(type)
			}
		};
	};
</script>

<script lang="ts">
	import { getType } from '@packages/graphql/request/Introspection';
	import type { __Type } from '@packages/graphql/types';
	import Section from '@packages/components/section/Section.svelte';
	import TypeCreator from '@packages/components-graphql/introspection/TypeCreator.svelte';
	import FormLoading from '@packages/components/form/FormLoading.svelte';
	export let typeName: string;

	let typePromise = getType(typeName);
</script>

<Section>
	{#await typePromise}
		<FormLoading />
	{:then response}
		<TypeCreator __type={response.__type} />
	{/await}
</Section>
