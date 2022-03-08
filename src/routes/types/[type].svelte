<script context="module">
	import { TypeManager } from '$lib/TypeManager';
	const manager = new TypeManager();
	export async function load({ params }) {
		return {
			props: {
				typeName: manager.urlToTypeName(params.type)
			}
		};
	}
</script>

<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { operationStore, query } from '@urql/svelte';
	import TypeTable from '/src/components/graphql/introspection/TypeTable.svelte';
	import Section from '/src/components/ui/section/Section.svelte';
	import SectionHead from '/src/components/ui/section/SectionHead.svelte';
	import SectionLoading from '/src/components/ui/section/SectionLoading.svelte';
	import Button from '/src/components/ui/Button.svelte';
	export let typeName: string;

	afterUpdate(() => {
		$query__Type.variables.typeName = typeName;
		$query__Type.reexecute();
	});

	const query__Type = operationStore(
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
	query(query__Type);
</script>

<Section>
	{#if $query__Type.fetching}
		<SectionLoading />
	{:else}
		<SectionHead title={$query__Type.data.__type.name}>
			<Button
				on:click={(e) => {
					e.preventDefault();
					goto(`/types/${manager.typeNameToUrl(typeName)}/create`);
				}}
			>
				Create
			</Button>
		</SectionHead>
		<TypeTable __type={$query__Type.data.__type} />
	{/if}
</Section>
