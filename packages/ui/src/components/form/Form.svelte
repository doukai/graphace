<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Trash, ArrowUturnLeft, InboxArrowDown } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	export let title: string;
	export let detail: string | undefined = undefined;
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		save: {};
		remove: {};
		back: {};
	}>();
</script>

<div class="flex justify-end md:justify-between">
	<div class="hidden md:flex items-center">
		<span class="text-xl font-semibold">{title}</span>
	</div>
	<div class="flex space-x-1">
		{#if showRemoveButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
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
				{$LL.routers.type.remove()}
			</button>
		{/if}
		{#if showSaveButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.save()}>
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
				{$LL.routers.type.save()}
			</button>
		{/if}
		{#if showBackButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.back()}>
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
				{$LL.routers.type.back()}
			</button>
		{/if}
	</div>
</div>
<div class="divider" />
<div class="h-full w-full pb-6 bg-base-100">
	<form>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			<slot />
		</div>
	</form>
</div>
<div class="divider" />
<div class="flex justify-end space-x-1">
	{#if showRemoveButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
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
			{$LL.routers.type.remove()}
		</button>
	{/if}
	{#if showSaveButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.save()}>
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
			{$LL.routers.type.save()}
		</button>
	{/if}
	{#if showBackButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.back()}>
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
			{$LL.routers.type.back()}
		</button>
	{/if}
</div>
