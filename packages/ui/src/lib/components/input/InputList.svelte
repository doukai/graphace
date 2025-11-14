<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { createTagsInput, melt } from '@melt-ui/svelte';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XMark } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';

	export let name: string | undefined = undefined;
	export let value: (string | null | undefined)[] | null | undefined = undefined;
	export let placeholder: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let unique = true;
	export let addOnPaste = true;
	export let id: string | undefined = nanoid();
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.input-list') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: (string | null | undefined)[] | null | undefined;
		};
	}>();

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		disabled: disabled,
		editable: !readonly,
		placeholder: placeholder,
		defaultTags: value?.map((item) => ({ id: item, value: item })) || [],
		unique: unique,
		add(tag) {
			return { id: tag, value: tag };
		},
		addOnPaste: addOnPaste,
		onTagsChange: ({ curr, next }) => {
			value = [...next.map((tag) => tag.value)];
			dispatch('change', { value });
			return next;
		}
	});
</script>

<div data-element="input-list" data-part="root" class="{contextClass} {className}">
	<div
		data-part="list"
		use:melt={$root}
		class="flex flex-wrap items-center textarea {errors?.errors ||
		(errors?.iterms && Object.keys(errors?.iterms).length > 0)
			? 'textarea-error focus-within:outline-error'
			: 'focus-within:outline-base-content/20'}  focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 textarea-bordered w-full min-h-12 p-1 gap-1"
	>
		{#each $tags as t, index}
			<div
				data-part="tag"
				use:melt={$tag(t)}
				class="badge {errors?.iterms?.[index]
					? 'badge-error'
					: 'badge-neutral'} flex items-center [word-break:break-word] data-[disabled]:bg-neutral-content data-[selected]:bg-neutral-focus data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
			>
				<span data-part="text">{t.value}</span>
				<button
					data-part="btn-delete"
					use:melt={$deleteTrigger(t)}
					{disabled}
					class="flex items-center h-full enabled:hover:bg-neutral-focus"
				>
					<Icon data-part="icon-delete" src={XMark} class="size-3" />
				</button>
			</div>
			<div
				data-part="edit"
				use:melt={$edit(t)}
				class="badge badge-outline flex items-center overflow-hidden [word-break:break-word] data-[invalid-edit]:focus:text-error"
			>
				{t.value}
			</div>
		{/each}
		<input
			data-part="input"
			use:melt={$input}
			{id}
			{name}
			type="text"
			{placeholder}
			class="input px-1 h-5 w-full min-w-20 shrink grow basis-0 outline-none focus:outline-none focus:!ring-0 data-[invalid]:text-error"
		/>
	</div>
	{#if errors?.errors}
		<label data-part="label" for={id} class="label">
			{#each errors.errors as error}
				<span data-part="label-text-alt" class="label-text-alt">
					<p data-part="label-text" class="text-error">{error.message}</p>
				</span>
			{/each}
		</label>
	{/if}
</div>
