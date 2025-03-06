<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
	import type { Errors } from '@graphace/commons';

	export let name: string;
	export let value: boolean | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.toggle') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: boolean | null | undefined;
		};
	}>();
</script>

<div class="flex h-full">
	<input
		type="checkbox"
		{id}
		{name}
		class="toggle self-center {errors?.errors ? 'toggle-error' : ''} {className} {contextClass}"
		bind:checked={value}
		on:change={() => {
			dispatch('change', { value });
		}}
		{readonly}
		{disabled}
	/>
</div>
