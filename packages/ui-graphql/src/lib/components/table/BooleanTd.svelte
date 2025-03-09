<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Minus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let value: boolean | (boolean | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = undefined;
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		save: { value: boolean | (boolean | null | undefined)[] | null | undefined };
	}>();

	let mutation = (): void => {
		dispatch('save', { value });
		$open = false;
	};

	let clean = (): void => {
		if (Array.isArray(value)) {
			value = [];
		} else {
			value = null;
		}
		dispatch('save', { value });
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
		class="{errors ? `tooltip tooltip-open tooltip-error hover:z-[${zIndex + 3}]` : ''} {className}"
		data-tip={errors?.errors?.map((error) => error.message).join(', ')}
	>
		<a class="group link inline-flex" href={null} use:melt={$trigger}>
			{#if list}
				{#if Array.isArray(value)}
					{#if value.length > 3}
						{value
							.filter((item) => item !== null && item !== undefined)
							.slice(0, 3)
							.map((item) => (item ? $LL.ui_graphql.text.true() : $LL.ui_graphql.text.false()))
							.join(',')
							.concat('...')}
					{:else if value.length > 0}
						{value
							.filter((item) => item !== null && item !== undefined)
							.map((item) => (item ? $LL.ui_graphql.text.true() : $LL.ui_graphql.text.false()))
							.join(',')}
					{:else}
						<Icon src={Minus} class="h-5 w-5" />
					{/if}
				{:else}
					<Icon src={Minus} class="h-5 w-5" />
				{/if}
			{:else if value !== null && value !== undefined}
				{value ? $LL.ui_graphql.text.true() : $LL.ui_graphql.text.false()}
			{:else}
				<Icon src={Minus} class="h-5 w-5" />
			{/if}
		</a>
	</div>
</td>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="p-1 rounded-xl bg-base-100 shadow z-[{zIndex + 5}]" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="flex items-center space-x-1" transition:fade={{ duration: 100 }}>
			<slot />
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
