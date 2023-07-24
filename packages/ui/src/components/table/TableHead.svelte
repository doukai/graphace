<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SearchInput from '../search/SearchInput.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		Plus,
		Trash,
		ListBullet,
		Link,
		ArrowUturnLeft,
		InboxArrowDown
	} from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';

	export let title: string = '';
	export let showSearchInput: boolean = true;
	export let showCreateButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		create: {};
		save: {};
		remove: {};
		back: {};
		gotoSelect: {};
		select: {};
	}>();
</script>

<div class="flex justify-between">
	<div class="hidden md:flex items-center">
		<span class="text-xl font-semibold">{title}</span>
	</div>
	<div class="flex justify-between w-full md:w-auto space-x-1">
		{#if showSearchInput}
			<div class="flex">
				<SearchInput on:search />
			</div>
		{/if}
		<div class="flex space-x-1">
			{#if showRemoveButton}
				<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.remove()}>
					<button
						class="btn btn-error btn-outline btn-square md:hidden"
						on:click={(e) => {
							e.preventDefault();
							dispatch('remove');
						}}
					>
						<Icon src={Trash} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-outline btn-error"
					on:click={(e) => {
						e.preventDefault();
						dispatch('remove');
					}}
				>
					{$LL.ui.button.remove()}
				</button>
			{/if}
			{#if showCreateButton}
				<div class="tooltip tooltip-bottom" data-tip={$LL.ui.button.create()}>
					<button
						class="btn btn-primary btn-square md:hidden"
						on:click={(e) => {
							e.preventDefault();
							dispatch('create');
						}}
					>
						<Icon src={Plus} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-primary"
					on:click={(e) => {
						e.preventDefault();
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
						on:click={(e) => {
							e.preventDefault();
							dispatch('save');
						}}
					>
						<Icon src={InboxArrowDown} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-secondary"
					on:click={(e) => {
						e.preventDefault();
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
						on:click={(e) => {
							e.preventDefault();
							dispatch('gotoSelect');
						}}
					>
						<Icon src={ListBullet} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-outline btn-secondary"
					on:click={(e) => {
						e.preventDefault();
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
						on:click={(e) => {
							e.preventDefault();
							dispatch('select');
						}}
					>
						<Icon src={Link} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-secondary"
					on:click={(e) => {
						e.preventDefault();
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
						on:click={(e) => {
							e.preventDefault();
							dispatch('back');
						}}
					>
						<Icon src={ArrowUturnLeft} class="h-6 w-6" solid />
					</button>
				</div>
				<button
					class="hidden md:flex btn btn-neutral"
					on:click={(e) => {
						e.preventDefault();
						dispatch('back');
					}}
				>
					{$LL.ui.button.back()}
				</button>
			{/if}
		</div>
	</div>
</div>
