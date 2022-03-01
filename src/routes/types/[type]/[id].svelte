<script context="module">
	import { TypeManager } from '$lib/TypeManager';
	const manager = new TypeManager();
	export async function load({ params }) {
		return {
			props: {
				typeName: manager.urlToTypeName(params.type),
				id: params.id
			}
		};
	}
</script>

<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import Form from '/src/components/types/Form.svelte';
	export let typeName: string;
	export let id: string;

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

<div class="flex flex-col">
	<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
			<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
				<div class="bg-white">
					<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
						{#if $query__Type.fetching}
							<div class="min-w-full divide-y divide-gray-20 bg-slate-700 rounded" />
						{:else}
							<Form __type={$query__Type.data.__type} {id} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
