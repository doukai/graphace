<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Trash, Check, Plus, ArrowUturnLeft, CheckCircle, XCircle } from '@steeze-ui/heroicons';
	import Button from './Button.svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showCreateButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = false;
	export let loading: boolean = false;
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

<div data-element="buttons" data-part="root" class="{className} {contextClass}">
	<slot name="start" />
	{#if showRemoveButton}
		<Button
			{loading}
			text={$LL.ui.button.remove()}
			class="data-[part=button]:btn-error data-[part=button]:btn-outline data-[part=button-sm]:btn-square"
			on:click={(e) => {
				dispatch('remove');
			}}
		>
			<Icon slot="sm" src={Trash} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showUnbindButton}
		<Button
			{loading}
			text={$LL.ui.button.unbind()}
			class="data-[part=button]:btn-error data-[part=button]:btn-outline data-[part=button-sm]:btn-square"
			on:click={(e) => {
				dispatch('unbind');
			}}
		>
			<Icon slot="sm" src={XCircle} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showSaveButton}
		<Button
			{loading}
			text={$LL.ui.button.save()}
			class="data-[part=button]:btn-secondary data-[part=button-sm]:btn-square"
			on:click={(e) => {
				dispatch('save');
			}}
		>
			<Icon slot="sm" src={Check} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showCreateButton}
		<Button
			{loading}
			text={$LL.ui.button.create()}
			class="data-[part=button]:btn-primary data-[part=button-sm]:btn-square"
			on:click={(e) => {
				dispatch('create');
			}}
		>
			<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
		</Button>
	{/if}
	{#if showSelectButton}
		<Button
			{loading}
			text={$LL.ui.button.select()}
			class="data-[part=button]:btn-secondary data-[part=button]:btn-outline data-[part=button-sm]:btn-square"
			on:click={(e) => {
				dispatch('select');
			}}
		>
			<Icon slot="sm" src={CheckCircle} class="h-6 w-6" solid />
		</Button>
	{/if}
	<slot />
	{#if showBackButton}
		<Button
			text={$LL.ui.button.back()}
			class="data-[part=button]:btn-neutral data-[part=button-sm]:btn-square"
			on:click={(e) => {
				dispatch('back');
			}}
		>
			<Icon slot="sm" src={ArrowUturnLeft} class="h-6 w-6" solid />
		</Button>
	{/if}
</div>
