<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MagnifyingGlass } from '@steeze-ui/heroicons';
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
	}>();
</script>

<div class="join">
	<input
		type="search"
		class="w-full input input-bordered join-item"
		{name}
		placeholder={$LL.ui.searchInput.placeholder()}
		bind:value
	/>
	<button
		class="btn btn-square join-item"
		on:click|preventDefault={() => dispatch('search', { value })}
	>
		<Icon src={MagnifyingGlass} class="h-6 w-6" />
	</button>
</div>
