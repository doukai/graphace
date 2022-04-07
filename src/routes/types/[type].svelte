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
				props: { fetchType }
			};
		} else {
			throw new Error(res.statusText);
		}
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { __Type } from '$lib/__Type';
	import TypeTable from '@components/graphql/introspection/TypeTable.svelte';
	import SectionHead from '@components/ui/section/SectionHead.svelte';
	import SectionLoading from '@components/ui/section/SectionLoading.svelte';
	import SearchInput from '@components/ui/search/SearchInput.svelte';

	type Data = { __type: __Type };
	export let fetchType: Promise<Data>;

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
				goto(`/types/${response.__type.name}/create`);
			}}
		>
			Create
		</button>
	</SectionHead>
	<div class="divider" />
	<TypeTable __type={response.__type} {queryValue} />
{/await}
