<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	import SearchInput from '../search/SearchInput.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		Plus,
		Trash,
		ListBullet,
		Link,
		ArrowUturnLeft,
		InboxArrowDown,
		ArchiveBoxXMark
	} from '@steeze-ui/heroicons';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let title: string = '';
	export let showSearchInput: boolean = true;
	export let showCreateButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		create: {};
		save: {};
		select: {};
		remove: {};
		unbind: {};
		gotoSelect: {};
		back: {};
	}>();
</script>

<div class="flex justify-between">
	<div class="hidden md:flex items-center">
		<span class="text-xl font-semibold">{title}</span>
	</div>
	<div class="flex justify-between w-full md:w-auto space-x-1">
		<div class="flex">
			{#if showSearchInput}
				<SearchInput on:search />
			{/if}
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
			{#if showCreateButton}
				<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.create()}>
					<button
						class="btn btn-primary btn-square md:hidden"
						on:click|preventDefault={(e) => {
							dispatch('create');
						}}
					>
						<Icon src={Plus} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-primary"
					on:click|preventDefault={(e) => {
						dispatch('create');
					}}
				>
					{$LL.ui.button.create()}
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
						<Icon src={ListBullet} class="h-6 w-6" solid />
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
			{#if showSelectButton}
				<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.select()}>
					<button
						class="btn btn-secondary btn-square md:hidden"
						on:click|preventDefault={(e) => {
							dispatch('select');
						}}
					>
						<Icon src={Link} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-secondary"
					on:click|preventDefault={(e) => {
						dispatch('select');
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
</div>
