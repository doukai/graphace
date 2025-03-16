<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { createToggleGroup, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XMark, Check, Plus, Minus } from '@steeze-ui/heroicons';
	import { nanoid } from 'nanoid';
	import type { Errors } from '@graphace/commons';

	export let value: (boolean | null | undefined)[] | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string | undefined = nanoid();
	let className: string | undefined = 'flex flex-wrap';
	export { className as class };

	const contextClass = getContext<string>('ui.toggle-list') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: (boolean | null | undefined)[] | null | undefined;
		};
	}>();

	const {
		elements: { root, item }
	} = createToggleGroup({
		type: 'multiple',
		disabled: disabled || readonly,
		defaultValue: value.filter((item) => item === true).map((_, index) => index + ''),
		onValueChange: ({ curr, next }) => {
			value = value.map((_, index) => next.includes(index + ''));
			dispatch('change', { value });
			return next;
		}
	});
</script>

<div
	use:melt={$root}
	class="join data-[orientation='vertical']:flex-col {className} {contextClass}"
>
	<button
		class="btn btn-primary join-item shrink"
		aria-label="-"
		on:click|preventDefault={(e) => (value = [...value.slice(1)])}
	>
		<Icon src={Minus} class="h-5 w-5" />
	</button>
	{#each value as v, index}
		<button
			class="btn join-item shrink data-[state='on']:btn-neutral"
			use:melt={$item(index + '')}
			aria-label="index"
		>
			{#if v}
				<Icon src={Check} class="h-5 w-5" />
			{:else}
				<Icon src={XMark} class="h-5 w-5" />
			{/if}
		</button>
	{/each}
	<button
		{id}
		class="btn btn-primary join-item shrink"
		aria-label="+"
		on:click|preventDefault={(e) => (value = [...value, false])}
	>
		<Icon src={Plus} class="h-5 w-5" />
	</button>
</div>
{#if errors?.errors}
	<label for={id} class="label">
		{#each errors.errors as error}
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		{/each}
	</label>
{/if}
