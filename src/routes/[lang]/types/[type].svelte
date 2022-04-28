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
	import { SectionHead, SectionLoading } from '$lib/components/ui/section';
	import SearchInput from '$lib/components/ui/search/SearchInput.svelte';
	import LL from '$i18n/i18n-svelte';
	export let typeName: string;

	$: fetchType = getType(typeName);

	let queryValue: string = null;
	let search = (event: CustomEvent<{ value: string }>) => {
		queryValue = event.detail.value;
	};

	let selectChange = (event: CustomEvent<{ selectedIdList: string[] }>) => {
		// alert(JSON.stringify(event.detail.selectedIdList));
	};
</script>

{#await fetchType}
	<SectionLoading />
{:then response}
	<SectionHead title={response.__type.name}>
		<SearchInput on:search={search} />
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				goto(`./${response.__type.name}/create`);
			}}
		>
			{$LL.components.routers.type.create()}
		</button>
	</SectionHead>
	<div class="divider" />
	<TypeTable __type={response.__type} {queryValue} on:selectChange={selectChange} />
{/await}
