<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import type { __Type } from '$lib/types/__Type';
	import { TypeManager } from '$lib/TypeManager';

	const manager = new TypeManager();
	let fetchTypeList = getTypeList();

	async function getTypeList() {
		const res = await fetch(`/introspection/typeList.json`);
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(res.statusText);
		}
	}
</script>

{#await fetchTypeList}
	<ul class="menu w-56 p-2 rounded-box">
		<div class="animate-pulse space-y-1">
			{#each { length: 24 } as _, i} <div class="py-4 bg-base-100 rounded" /> {/each}
		</div>
	</ul>
{:then response}
	<ul class="menu w-56 p-2 rounded-box">
		{#each response.__typeList as __type}
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
{/await}
