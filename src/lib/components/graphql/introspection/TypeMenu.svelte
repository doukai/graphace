<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { getTypeList } from '$lib/graphql/Introspection';
	import type { __Type } from '$lib/types/__Type';
	import { TypeManager } from '$lib/TypeManager';
	import { locale } from '$i18n/i18n-svelte';

	const manager: TypeManager = new TypeManager();
	let fetchTypeList = getTypeList();
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
					href={null}
					on:click={(e) => {
						e.preventDefault();
						goto(`/${$locale}/types/${manager.typeNameToUrl(__type.name)}`);
					}}
					class={$page.url.pathname.startsWith(
						`/${$locale}/types/${manager.typeNameToUrl(__type.name)}`
					)
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
