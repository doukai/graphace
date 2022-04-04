<script lang="ts">
	import { TypeManager } from '$lib/TypeManager';
	import { operationStore, query } from '@urql/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
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

<div class="navbar text-neutral-content">
	<a class="btn btn-ghost normal-case text-xl" href={null}>
		<Icon class="h-8 mr-3 w-auto" icon="logos:graphql" />
		Graphace
	</a>
</div>
<div class="flex-1 flex flex-col overflow-y-auto">
	{#if $__typeList.fetching}
		<ul class="menu w-56 p-2 rounded-box">
			<div class="animate-pulse space-y-1">
				{#each { length: 24 } as _, i} <div class="py-3 bg-base-100 rounded" /> {/each}
			</div>
		</ul>
	{:else}
		<ul class="menu w-56 p-2 rounded-box">
			{#each $__typeList.data.__typeList as __type}
				<li>
					<a
						href="/types/{manager.typeNameToUrl(__type.name)}"
						on:click={(e) => {
							e.preventDefault();
							goto('/types/' + manager.typeNameToUrl(__type.name));
						}}
						class={$page.url.pathname.startsWith('/types/' + manager.typeNameToUrl(__type.name))
							? 'active'
							: ''}
					>
						<Icon icon="file-icons:graphql" />
						{__type.name}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
