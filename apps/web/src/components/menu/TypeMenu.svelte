<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import type { __Type } from '@graphace/graphql/types';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import { locale } from '~/i18n/i18n-svelte';
	import { __schema } from '~/gql/generated/introspection.json';

	const manager: TypeManager = new TypeManager();
</script>

{#each __schema.types.filter((type) => type.kind === 'OBJECT') as __type}
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
