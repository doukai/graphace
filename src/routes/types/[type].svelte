<script context="module">
	import { TypeManager } from '$lib/TypeManager';
	const manager = new TypeManager();
	export const load = async ({ fetch, params }) => {
		const { type } = params;
		const res = await fetch(`/types/${manager.urlToTypeName(type)}`);
		if (res.ok) {
			const { post } = await res.json();
			return {
				props: { post }
			};
		}
	};
</script>

<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { operationStore, query } from '@urql/svelte';
	import TypeTable from '/src/components/graphql/introspection/TypeTable.svelte';
	import SectionHead from '/src/components/ui/section/SectionHead.svelte';
	import SectionLoading from '/src/components/ui/section/SectionLoading.svelte';
	import SearchInput from '/src/components/ui/search/SearchInput.svelte';
	export let typeName: string;

	afterUpdate(() => {
		$queryType.variables.typeName = typeName;
		$queryType.reexecute();
	});

	const queryType = operationStore(
		`#graphql
        query ($typeName: String) {
			__type(name:{val: $typeName}){
            	name
             	kind
            	description
            	fields{
                	name
                	type{
                    	name
                    	kind
                    	ofType{
                        	name
                        	kind
                        	ofType{
                            	name
                            	kind
                            	ofType{
                                	name
                                	kind
                                }
                            }
                        }
                    }
                    description
                }
            }
        }`,
		{ typeName }
	);
	query(queryType);

	let queryValue: string = null;
	let search = (value: string) => {
		queryValue = value;
	};
</script>

{#if $queryType.fetching}
	<SectionLoading />
{:else}
	<SectionHead title={$queryType.data.__type.name}>
		<SearchInput onClick={search} />
		<button
			class="ml-3 btn"
			on:click={(e) => {
				e.preventDefault();
				goto(`/types/${manager.typeNameToUrl(typeName)}/create`);
			}}
		>
			Create
		</button>
	</SectionHead>
	<div class="divider" />
	<TypeTable __type={$queryType.data.__type} {queryValue} />
{/if}
