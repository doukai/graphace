<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MagnifyingGlass } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	export let name: string = '';
	export let value: string | undefined;
	const dispatch = createEventDispatcher<{
		search: {};
	}>();
</script>

<div class="join">
	<input
		type="text"
		class="input input-bordered join-item"
		{name}
		placeholder={$LL.components.ui.searchInput.placeholder()}
		bind:value
	/>
	<button class="btn btn-square join-item" on:click={() => dispatch('search')}>
		<Icon src={MagnifyingGlass} class="h-6 w-6" />
	</button>
</div>
