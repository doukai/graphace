<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { Errors, FileInfo } from '@graphace/commons';
	import { FileInput, FileInputList, z_index } from '@graphace/ui';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Minus } from '@steeze-ui/heroicons';

	export let value: FileInfo | (FileInfo | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let zIndex: number | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const z_class3 = zIndex || z_index.top(3);
	const z_class5 = z_class3 + 2;

	const dispatch = createEventDispatcher<{
		save: {};
	}>();

	let mutation = (): void => {
		if (Array.isArray(value)) {
			value = value.filter((item) => item);
		}
		dispatch('save');
		$open = false;
	};

	let clean = (): void => {
		if (Array.isArray(value)) {
			value = [];
		} else {
			value = null;
		}
		dispatch('save');
		$open = false;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

<td>
	<div
		class={errors ? `tooltip tooltip-open tooltip-error hover:${z_class3}` : ''}
		data-tip={errors?.errors?.map((error) => error.message).join(', ')}
	>
		<a class="group link inline-flex" href={null} use:melt={$trigger}>
			{#if list}
				{#if Array.isArray(value)}
					{#if value.length > 3}
						{value
							.filter((item) => item)
							.map((item) => item.name)
							.slice(0, 3)
							.join(',')
							.concat('...')}
					{:else if value.length > 0}
						{value
							.filter((item) => item)
							.map((item) => item.name)
							.join(',')}
					{:else}
						<Icon src={Minus} class="h-5 w-5" />
					{/if}
				{:else}
					<Icon src={Minus} class="h-5 w-5" />
				{/if}
			{:else if value}
				{value?.name}
			{:else}
				<Icon src={Minus} class="h-5 w-5" />
			{/if}
		</a>
	</div>
</td>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 {z_class5}" />
	<div class="p-1 rounded-xl bg-base-100 shadow {z_class5}" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="flex items-center space-x-1" transition:fade={{ duration: 100 }}>
			{#if list}
				<FileInputList
					{placeholder}
					{name}
					bind:value
					{errors}
					{readonly}
					{disabled}
					className="md:file-input-sm"
					linkClassName="md:input-sm"
					addBtnClassName="md:btn-sm"
					on:upload
				/>
			{:else}
				<FileInput
					{placeholder}
					{name}
					bind:value
					{errors}
					{readonly}
					{disabled}
					className="md:file-input-sm"
					linkClassName="md:input-sm"
					on:upload
				/>
			{/if}
			{#if !readonly && !disabled}
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.td.save()}>
					<button
						class="btn btn-square btn-primary md:btn-sm"
						on:click|preventDefault={(e) => mutation()}
					>
						<Icon src={Check} class="h-5 w-5" />
					</button>
				</div>
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.td.clear()}>
					<button
						class="btn btn-square btn-outline btn-error md:btn-sm"
						on:click|preventDefault={(e) => clean()}
					>
						<Icon src={XMark} class="h-5 w-5" />
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
