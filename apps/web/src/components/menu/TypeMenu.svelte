<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { graphql } from '$houdini';
	import Icon from '@iconify/svelte';
	import type { __Type } from '@graphace/graphql/types';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import { locale } from '~/i18n/i18n-svelte';

	const manager: TypeManager = new TypeManager();
	const objectList = graphql`
		query ObjectList {
			__typeList(kind: { val: OBJECT }) {
				name
				description
			}
		}
	`;
</script>

{#if $objectList.isFetching}
	<div class="animate-pulse space-y-1">
		{#each { length: 24 } as _, i}
			<div class="py-4 bg-base-100 rounded" />
		{/each}
	</div>
{:else}
	{#each $objectList.data.__typeList as __type}
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
{/if}
