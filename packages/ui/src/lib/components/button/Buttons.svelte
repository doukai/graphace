<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Trash, XMark, Check, Plus, Link, ArrowUturnLeft } from '@steeze-ui/heroicons';
	import Button from './Button.svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showCreateButton: boolean = true;
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
		create: {};
		select: {};
		back: {};
	}>();
</script>

<div class="{className} {contextClass}">
	<slot name="start" />
	{#if showRemoveButton}
		<Button
			text={$LL.ui.button.remove()}
			class="btn-error btn-outline max-sm:btn-square"
			on:click={(e) => {
				dispatch('remove');
			}}
		>
			<Icon slot="sm" src={Trash} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showUnbindButton}
		<Button
			text={$LL.ui.button.unbind()}
			class="btn-error btn-outline max-sm:btn-square"
			on:click={(e) => {
				dispatch('unbind');
			}}
		>
			<Icon slot="sm" src={XMark} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showSaveButton}
		<Button
			text={$LL.ui.button.save()}
			class="btn-secondary max-sm:btn-square"
			on:click={(e) => {
				dispatch('save');
			}}
		>
			<Icon slot="sm" src={Check} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showCreateButton}
		<Button
			text={$LL.ui.button.create()}
			class="btn-primary max-sm:btn-square"
			on:click={(e) => {
				dispatch('create');
			}}
		>
			<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showSelectButton}
		<Button
			text={$LL.ui.button.select()}
			class="btn-secondary btn-outline max-sm:btn-square"
			on:click={(e) => {
				dispatch('select');
			}}
		>
			<Icon slot="sm" src={Link} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showBackButton}
		<Button
			text={$LL.ui.button.back()}
			class="btn-neutral max-sm:btn-square"
			on:click={(e) => {
				dispatch('back');
			}}
		>
			<Icon slot="sm" src={ArrowUturnLeft} class="h-6 w-6" solid />
		</Button>
	{/if}
	<slot />
</div>
