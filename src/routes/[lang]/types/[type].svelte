<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '$lib/TypeManager';
	const manager: TypeManager = new TypeManager();
	export const load: Load = async ({ params }) => {
		const { type } = params;
		return {
			props: { typeName: manager.urlToTypeName(type) }
		};
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { __Type } from '$lib/types/__Type';
	import { getType } from '$lib/graphql/Introspection';
	import TypeTable from '$lib/components/graphql/introspection/table/TypeTable.svelte';
	import SectionHead from '$lib/components/ui/section/SectionHead.svelte';
	import SectionLoading from '$lib/components/ui/section/SectionLoading.svelte';
	import SearchInput from '$lib/components/ui/search/SearchInput.svelte';
	export let typeName: string;

	$: fetchType = getType(typeName);

	let queryValue: string = null;
	let search = (value: string) => {
		queryValue = value;
	};
</script>

{#await fetchType}
	<SectionLoading />
{:then response}
	<SectionHead title={response.__type.name}>
		<SearchInput onClick={search} />
		<button
			class="ml-3 btn"
			on:click={(e) => {
				e.preventDefault();
				goto(`./${response.__type.name}/create`);
			}}
		>
			Create
		</button>
	</SectionHead>
	<div class="divider" />
	<TypeTable __type={response.__type} {queryValue} />
{/await}
