<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MagnifyingGlass } from '@steeze-ui/heroicons';
	export let id: string | undefined = nanoid();
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let placeholder: string = '';
	let className: string | undefined = 'input-bordered w-full';
	export { className as class };

	const contextClass = getContext<string>('ui.input') || '';

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
	}>();
</script>

<div class="join w-full">
	<input
		type="search"
		{id}
		{name}
		{placeholder}
		bind:value
		class="input join-item {className} {contextClass}"
	/>
	<button
		class="btn btn-square join-item"
		on:click|preventDefault={() => dispatch('search', { value })}
	>
		<Icon src={MagnifyingGlass} class="h-6 w-6" />
	</button>
</div>
