<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Search } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	export let name: string = '';
	export let value: string | undefined;
	const dispatch = createEventDispatcher<{
		search: {};
	}>();
</script>

<div class="form-control">
	<div class="input-group">
		<input
			type="text"
			class="input input-bordered"
			{name}
			placeholder={$LL.components.ui.searchInput.placeholder()}
			bind:value
		/>
		<button class="btn btn-square" on:click={() => dispatch('search')}>
			<Icon src={Search} class="h-6 w-6" solid />
		</button>
	</div>
</div>
