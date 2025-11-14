<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MagnifyingGlass } from '@steeze-ui/heroicons';
	export let id: string | undefined = nanoid();
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let placeholder: string = '';
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.input') || '';

	const dispatch = createEventDispatcher<{
		search: { value: string | undefined };
	}>();
</script>

<div data-element="search-input" data-part="root" class="join {contextClass} {className}">
	<input
		data-part="input"
		type="search"
		{id}
		{name}
		{placeholder}
		bind:value
		class="input join-item input-bordered w-full"
	/>
	<button
		data-part="btn-search"
		class="btn btn-square join-item"
		on:click|preventDefault={() => dispatch('search', { value })}
	>
		<Icon data-part="icon-search" src={MagnifyingGlass} class="h-6 w-6" />
	</button>
</div>
