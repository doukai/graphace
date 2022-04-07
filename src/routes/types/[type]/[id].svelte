<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '$lib/TypeManager';
	const manager = new TypeManager();
	export const load: Load = async ({ fetch, params }) => {
		const { type, id } = params;
		const res = await fetch(`/types/${manager.urlToTypeName(type)}.json`);
		if (res.ok) {
			const fetchType = res.json();
			return {
				props: {
					fetchType,
					id
				}
			};
		} else {
			throw new Error(res.statusText);
		}
	};
</script>

<script lang="ts">
	import Section from '/src/components/ui/section/Section.svelte';
	import TypeEditor from '/src/components/graphql/introspection/TypeEditor.svelte';
	import FormLoading from '/src/components/ui/form/FormLoading.svelte';
	import type { __Type } from '$lib/__Type';

	type Data = { __type: __Type };
	export let fetchType: Promise<Data>;
	export let id: string;
</script>

<Section>
	{#await fetchType}
		<FormLoading />
	{:then response}
		<TypeEditor __type={response.__type} {id} />
	{/await}
</Section>
