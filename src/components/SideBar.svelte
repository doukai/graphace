<script lang="ts">
	import { TypeManager } from '$lib/TypeManager';
	import { operationStore, query } from '@urql/svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	const manager = new TypeManager();

	const __typeList = operationStore(
		`#graphql
        query {
            __typeList(kind: {val: OBJECT}){
                name
				description
            }
        }`
	);

	query(__typeList);
</script>

<div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
	<div class="flex-1 flex flex-col min-h-0 bg-gray-800">
		<div class="text-indigo-100 flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
			<Icon class="h-8 mr-3 w-auto" icon="logos:graphql" />
			GrapPhace
		</div>
		<div class="flex-1 flex flex-col overflow-y-auto">
			<nav class="flex-1 px-2 py-4 space-y-1">
				{#if $__typeList.fetching}
					<ul>
						<div class="animate-pulse space-y-4">
							{#each { length: 24 } as _, i} <div class="py-2 bg-slate-700 rounded" /> {/each}
						</div>
					</ul>
				{:else}
					<ul>
						{#each $__typeList.data.__typeList as __type}
							<a
								href="/types/{manager.typeNameToUrl(__type.name)}"
								on:click={(e) => {
									e.preventDefault();
									goto('/types/' + manager.typeNameToUrl(__type.name));
								}}
								class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
							>
								<Icon class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" icon="file-icons:graphql" />
								{__type.name}
							</a>
						{/each}
					</ul>
				{/if}
			</nav>
		</div>
	</div>
</div>
