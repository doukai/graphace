<script context="module">
	export async function load({ params }) {
		return {
			props: {
				typeName: params.type
			}
		};
	}
</script>

<script>
	import { afterUpdate } from 'svelte';
	import { operationStore, query } from '@urql/svelte';
	export let typeName;

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
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								{#each $__type.data.__type.fields as field}
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										{field.name}
									</th>
								{/each}
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody>
							<!-- Odd row -->
							<tr class="bg-white">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
									>Jane Cooper</td
								>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>Regional Paradigm Technician</td
								>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>jane.cooper@example.com</td
								>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
								<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
								</td>
							</tr>

							<!-- Even row -->
							<tr class="bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
									>Cody Fisher</td
								>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>Product Directives Officer</td
								>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>cody.fisher@example.com</td
								>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Owner</td>
								<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
								</td>
							</tr>

							<!-- More people... -->
						</tbody>
					</table>
				{/if}
			</div>
		</div>
	</div>
</div>
