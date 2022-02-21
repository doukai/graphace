<script>
	import { operationStore, query } from '@urql/svelte';

	const __typeList = operationStore(`#graphql
        query {
            __typeList(kind:{val:OBJECT}){
                name
            }
        }
    `);

	query(__typeList);
</script>

<!-- Static sidebar for desktop -->
<div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
	<!-- Sidebar component, swap this element with another sidebar if you like -->
	<div class="flex-1 flex flex-col min-h-0 bg-gray-800">
		<div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
			<img
				class="h-8 w-auto"
				src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
				alt="Workflow"
			/>
		</div>
		<div class="flex-1 flex flex-col overflow-y-auto">
			<nav class="flex-1 px-2 py-4 space-y-1">
                {#if $__typeList.fetching}
                <p>Loading...</p>
                {:else if $__typeList.data.errors}
                <p>Oh no... </p>
                {:else}
                <ul>
                {#each $__typeList.data.__typeList as __type}
				<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
				<a
					href="#"
					class="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
				>
					<!--
                  Heroicon name: outline/home
    
                  Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300"
                -->
					<svg
						class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					{__type.name}
				</a>
                {/each}
                </ul>
                {/if}

			</nav>
		</div>
	</div>
</div>
