<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		Trash,
		ArrowUturnLeft,
		Link,
		InboxArrowDown,
		ArchiveBoxXMark
	} from '@steeze-ui/heroicons';

	export let title: string;
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		save: {};
		remove: {};
		select: {};
		back: {};
		unbind: {};
		gotoSelect: {};
	}>();
</script>

<div class="flex justify-end md:justify-between">
	<div class="hidden md:flex items-center">
		<span class="text-xl font-semibold">{title}</span>
	</div>
	<div class="flex space-x-1">
		{#if showRemoveButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.remove()}>
				<button
					class="btn btn-error btn-outline btn-square md:hidden"
					on:click|preventDefault={(e) => {
						dispatch('remove');
					}}
				>
					<Icon src={Trash} class="h-6 w-6" solid />
				</button>
			</div>
			<button
				class="hidden md:flex btn btn-outline btn-error"
				on:click|preventDefault={(e) => {
					dispatch('remove');
				}}
			>
				{$LL.ui.button.remove()}
			</button>
		{/if}
		{#if showUnbindButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.unbind()}>
				<button
					class="btn btn-error btn-outline btn-square md:hidden"
					on:click|preventDefault={(e) => {
						dispatch('unbind');
					}}
				>
					<Icon src={ArchiveBoxXMark} class="h-6 w-6" solid />
				</button>
			</div>
			<button
				class="hidden md:flex btn btn-outline btn-error"
				on:click|preventDefault={(e) => {
					dispatch('unbind');
				}}
			>
				{$LL.ui.button.unbind()}
			</button>
		{/if}
		{#if showSaveButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.save()}>
				<button
					class="btn btn-secondary btn-square md:hidden"
					on:click|preventDefault={(e) => {
						dispatch('save');
					}}
				>
					<Icon src={InboxArrowDown} class="h-6 w-6" solid />
				</button>
			</div>
			<button
				class="hidden md:flex btn btn-secondary"
				on:click|preventDefault={(e) => {
					dispatch('save');
				}}
			>
				{$LL.ui.button.save()}
			</button>
		{/if}
		{#if showGotoSelectButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.select()}>
				<button
					class="btn btn-outline btn-secondary btn-square md:hidden"
					on:click|preventDefault={(e) => {
						dispatch('gotoSelect');
					}}
				>
					<Icon src={Link} class="h-6 w-6" solid />
				</button>
			</div>
			<button
				class="hidden md:flex btn btn-outline btn-secondary"
				on:click|preventDefault={(e) => {
					dispatch('gotoSelect');
				}}
			>
				{$LL.ui.button.select()}
			</button>
		{/if}
		{#if showBackButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.back()}>
				<button
					class="btn btn-neutral btn-square md:hidden"
					on:click|preventDefault={(e) => {
						dispatch('back');
					}}
				>
					<Icon src={ArrowUturnLeft} class="h-6 w-6" solid />
				</button>
			</div>
			<button
				class="hidden md:flex btn btn-neutral"
				on:click|preventDefault={(e) => {
					dispatch('back');
				}}
			>
				{$LL.ui.button.back()}
			</button>
		{/if}
	</div>
</div>
<div class="divider" />
<div class="overflow-x-auto">
	<div class="h-full w-full pb-6 bg-base-100">
		<form>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				<slot />
			</div>
		</form>
	</div>
</div>
<div class="divider" />
<div class="flex justify-end space-x-1">
	{#if showRemoveButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.remove()}>
			<button
				class="btn btn-error btn-outline btn-square md:hidden"
				on:click|preventDefault={(e) => {
					dispatch('remove');
				}}
			>
				<Icon src={Trash} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:flex btn btn-outline btn-error"
			on:click|preventDefault={(e) => {
				dispatch('remove');
			}}
		>
			{$LL.ui.button.remove()}
		</button>
	{/if}
	{#if showUnbindButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.unbind()}>
			<button
				class="btn btn-error btn-outline btn-square md:hidden"
				on:click|preventDefault={(e) => {
					dispatch('unbind');
				}}
			>
				<Icon src={ArchiveBoxXMark} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:flex btn btn-outline btn-error"
			on:click|preventDefault={(e) => {
				dispatch('unbind');
			}}
		>
			{$LL.ui.button.unbind()}
		</button>
	{/if}
	{#if showSaveButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.save()}>
			<button
				class="btn btn-secondary btn-square md:hidden"
				on:click|preventDefault={(e) => {
					dispatch('save');
				}}
			>
				<Icon src={InboxArrowDown} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:flex btn btn-secondary"
			on:click|preventDefault={(e) => {
				dispatch('save');
			}}
		>
			{$LL.ui.button.save()}
		</button>
	{/if}
	{#if showGotoSelectButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.select()}>
			<button
				class="btn btn-outline btn-secondary btn-square md:hidden"
				on:click|preventDefault={(e) => {
					dispatch('gotoSelect');
				}}
			>
				<Icon src={Link} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:flex btn btn-outline btn-secondary"
			on:click|preventDefault={(e) => {
				dispatch('gotoSelect');
			}}
		>
			{$LL.ui.button.select()}
		</button>
	{/if}
	{#if showBackButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.back()}>
			<button
				class="btn btn-neutral btn-square md:hidden"
				on:click|preventDefault={(e) => {
					dispatch('back');
				}}
			>
				<Icon src={ArrowUturnLeft} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:flex btn btn-neutral"
			on:click|preventDefault={(e) => {
				dispatch('back');
			}}
		>
			{$LL.ui.button.back()}
		</button>
	{/if}
</div>
