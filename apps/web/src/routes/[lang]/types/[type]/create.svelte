<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
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
	import { goto } from '$app/navigation';
	import { getType } from '@graphace/graphql/request/Introspection';
	import type { __Type } from '@graphace/graphql/types';
	import Section from '@graphace/ui/components/section/Section.svelte';
	import TypeCreator from '@graphace/ui-graphql/components/introspection/TypeCreator.svelte';
	import FormLoading from '@graphace/ui/components/form/FormLoading.svelte';
	export let typeName: string;

	let typePromise = getType(typeName);
</script>

<Section>
	{#await typePromise}
		<FormLoading />
	{:then response}
		<TypeCreator
			__type={response.__type}
			on:back={() => {
				goto(`../${manager.typeNameToUrl(response.__type.name)}`);
			}}
		/>
	{/await}
</Section>
