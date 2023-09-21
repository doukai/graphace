<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { GraphQLError } from '@graphace/commons/types';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';

	export let typeNames: string[] | null | undefined;
	export let activeTypeName: string | null | undefined;
</script>

<ul class="menu">
	{#if typeNames}
		{#each typeNames as typeName}
			<li>
				<a
					class={typeName === activeTypeName ? 'active' : ''}
					href={null}
					on:click={(e) => {
						e.preventDefault();
						activeTypeName = typeName;
					}}
				>
					{typeName}
				</a>
			</li>
		{/each}
	{/if}
</ul>
