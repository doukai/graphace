<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LL from '$i18n/i18n-svelte';

	export let items:
		| { value: any | null | undefined; label: string | null | undefined }[]
		| null
		| undefined = [];
	export let selectedItem:
		| { value: any | null | undefined; label: string | null | undefined }
		| null
		| undefined = undefined;
	export let name: string | undefined = undefined;
	export let placeholder: string = '';
	let searchValue: string | null | undefined = undefined;

	const dispatch = createEventDispatcher<{
		search: { searchValue: string | null | undefined };
	}>();

	$: dispatch('search', { searchValue });
</script>

<div class="dropdown">
	<input
		type="search"
		class="input input-bordered w-full"
		{name}
		{placeholder}
		bind:value={searchValue}
	/>
	{#if items && items.length > 0}
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			tabindex="0"
			class="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-full max-h-80 flex-nowrap overflow-auto"
		>
			{#each items as item}
				<li>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						on:click|preventDefault={() => {
							selectedItem = item;
							searchValue = item.label;
						}}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div
			class="dropdown-content z-[50] p-2 shadow bg-base-100 rounded-box w-full max-h-80 flex justify-center flex-nowrap"
		>
			<span class="badge badge-ghost">{$LL.ui.table.empty()}</span>
		</div>
	{/if}
</div>
