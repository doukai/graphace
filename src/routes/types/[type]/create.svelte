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
	import { operationStore, query } from '@urql/svelte';
	import Section from '/src/components/ui/section/Section.svelte';
	import TypeCreator from '/src/components/graphql/introspection/TypeCreator.svelte';
	import FormLoading from '/src/components/ui/form/FormLoading.svelte';
	export let typeName: string;

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
</script>

<Section>
	{#if $queryType.fetching}
		<FormLoading />
	{:else}
		<TypeCreator __type={$queryType.data.__type} />
	{/if}
</Section>
