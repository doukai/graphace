<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { getTypeList } from '$lib/graphql/Introspection';
	import type { __Type } from '$lib/types/__Type';
	import { TypeManager } from '$lib/TypeManager';
	import { locale } from '$i18n/i18n-svelte';
	import { filter } from 'lodash';

	const manager: TypeManager = new TypeManager();
	let fetchTypeList = getTypeList();
</script>

{#await fetchTypeList}
	<div class="animate-pulse space-y-1">
		{#each { length: 24 } as _, i} <div class="py-4 bg-base-100 rounded" /> {/each}
	</div>
{:then response}
	{#each response.__typeList.filter((__type) => !manager.isContainerType(__type)) as __type}
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
{/await}
