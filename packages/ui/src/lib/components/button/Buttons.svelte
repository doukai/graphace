<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Trash, XMark, Check, Link, ArrowUturnLeft } from '@steeze-ui/heroicons';
	import Button from './Button.svelte';

	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = false;
	let className: string | undefined = 'flex space-x-1';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const contextClass = getContext<string>('ui.buttons') || '';

	const dispatch = createEventDispatcher<{
		remove: {};
		unbind: {};
		save: {};
		select: {};
		back: {};
	}>();
</script>

<div class="{className} {contextClass}">
	{#if showRemoveButton}
		<Button
			text={$LL.ui.button.remove()}
			class="btn-error btn-outline max-sm:btn-square md:hidden"
			on:click={(e) => {
				dispatch('remove');
			}}
		>
			<Icon solt="sm" src={Trash} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showUnbindButton}
		<Button
			text={$LL.ui.button.unbind()}
			class="btn-error btn-outline max-sm:btn-square md:hidden"
			on:click={(e) => {
				dispatch('unbind');
			}}
		>
			<Icon src={XMark} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showSaveButton}
		<Button
			text={$LL.ui.button.save()}
			class="btn-secondary max-sm:btn-square md:hidden"
			on:click={(e) => {
				dispatch('save');
			}}
		>
			<Icon src={Check} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showSelectButton}
		<Button
			text={$LL.ui.button.select()}
			class="btn-secondary btn-outline max-sm:btn-square md:hidden"
			on:click={(e) => {
				dispatch('select');
			}}
		>
			<Icon src={Link} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showBackButton}
		<Button
			text={$LL.ui.button.back()}
			class="btn-neutral max-sm:btn-square md:hidden"
			on:click={(e) => {
				dispatch('back');
			}}
		>
			<Icon src={ArrowUturnLeft} class="h-6 w-6" solid />
		</Button>
	{/if}
	<slot />
</div>
