<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '$lib/TypeManager';
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
	import { getType } from '$lib/graphql/Introspection';
	import type { __Type } from '$lib/types/__Type';
	import Section from '$lib/components/ui/section/Section.svelte';
	import TypeCreator from '$lib/components/graphql/introspection/TypeCreator.svelte';
	import FormLoading from '$lib/components/ui/form/FormLoading.svelte';
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
