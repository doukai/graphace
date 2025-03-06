<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { createTagsInput, melt } from '@melt-ui/svelte';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XMark } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';

	export let name: string;
	export let value: (number | null | undefined)[] | null | undefined = undefined;
	export let placeholder: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let unique = true;
	export let addOnPaste = true;
	export let id: string = nanoid();
	let className: string | undefined = 'min-h-12 p-1 gap-1';
	export { className as class };

	const contextClass = getContext<string>('ui.input-list') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: (number | null | undefined)[] | null | undefined;
		};
	}>();

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		disabled: disabled,
		editable: !readonly,
		placeholder: placeholder,
		defaultTags: value?.map((item) => ({ id: item + '', value: item + '' })) || [],
		unique: unique,
		add(tag) {
			return { id: tag, value: tag };
		},
		addOnPaste: addOnPaste,
		onTagsChange: ({ curr, next }) => {
			value = [...next.map((tag) => parseFloat(tag.value))];
			dispatch('change', { value });
			return next;
		}
	});
</script>

<div
	use:melt={$root}
	class="flex flex-wrap items-center textarea textarea-bordered {errors?.errors ||
	(errors?.iterms && Object.keys(errors?.iterms).length > 0)
		? 'textarea-error focus-within:outline-error'
		: 'focus-within:outline-base-content/20'}  focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 {className} {contextClass}"
>
	{#each $tags as t, index}
		<div
			use:melt={$tag(t)}
			class="badge {errors?.iterms?.[index]
				? 'badge-error'
				: 'badge-neutral'} flex items-center [word-break:break-word] data-[disabled]:bg-neutral-content data-[selected]:bg-neutral-focus data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
		>
			<span>{t.value}</span>
			<button
				use:melt={$deleteTrigger(t)}
				{disabled}
				class="flex items-center h-full enabled:hover:bg-neutral-focus"
			>
				<Icon src={XMark} class="size-3" />
			</button>
		</div>
		<div
			use:melt={$edit(t)}
			class="badge badge-outline flex items-center overflow-hidden [word-break:break-word] data-[invalid-edit]:focus:text-error"
		>
			{t.value}
		</div>
	{/each}

	<input
		use:melt={$input}
		{id}
		{name}
		type="number"
		{placeholder}
		class="input px-1 h-5 w-full min-w-20 shrink grow basis-0 outline-none focus:outline-none focus:!ring-0 data-[invalid]:text-error"
	/>
</div>
