<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '$lib/TypeManager';
	const manager = new TypeManager();
	export const load: Load = async ({ fetch, params }) => {
		const { type } = params;
		const res = await fetch(`/types/${manager.urlToTypeName(type)}.json`);
		if (res.ok) {
			const fetchType = res.json();
			return {
				props: {
					fetchType
				}
			};
		} else {
			throw new Error(res.statusText);
		}
	};
</script>

<script lang="ts">
	import type { __Type } from '$lib/__Type';
	import Section from '@components/ui/section/Section.svelte';
	import TypeCreator from '@components/graphql/introspection/TypeCreator.svelte';
	import FormLoading from '@components/ui/form/FormLoading.svelte';

	type Data = { __type: __Type };
	export let fetchType: Promise<Data>;
</script>

<Section>
	{#await fetchType}
		<FormLoading />
	{:then response}
		<TypeCreator __type={response.__type} />
	{/await}
</Section>
