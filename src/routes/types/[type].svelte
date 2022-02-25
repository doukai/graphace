<script context="module">
	export async function load({ params }) {
		return {
			props: {
				typeName: params.type
			}
		};
	}
</script>

<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { operationStore, query } from '@urql/svelte';
	import Table from '/src/components/types/Table.svelte';
	export let typeName: string;

	afterUpdate(() => {
		$__type.variables.typeName = typeName;
		$__type.reexecute();
	});

	const __type = operationStore(
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
										ofType{
											name
											kind
										}
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
	query(__type);
</script>

<div class="flex flex-col">
	<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
			<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
				{#if $__type.fetching}
					<div class="min-w-full divide-y divide-gray-20 bg-slate-700 rounded" />
				{:else}
					<Table __type={$__type.data.__type} />
				{/if}
			</div>
		</div>
	</div>
</div>
