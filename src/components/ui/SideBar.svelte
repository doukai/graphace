<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import type { __Type } from '$lib/__Type';
	import { TypeManager } from '$lib/TypeManager';
	export let __typeList: Array<__Type>;

	const manager = new TypeManager();
</script>

<div class="navbar text-neutral-content">
	<a class="btn btn-ghost normal-case text-xl" href={null}>
		<Icon class="h-8 mr-3 w-auto" icon="logos:graphql" />
		Graphace
	</a>
</div>
<div class="flex-1 flex flex-col overflow-y-auto">
	<ul class="menu w-56 p-2 rounded-box">
		{#each __typeList as __type}
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
</div>
