<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bars4 } from '@steeze-ui/heroicons';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let showMenuButton: boolean = true;

	let scrollY: number;
	$: switchNavbarStyle = scrollY > 40 ? true : false;
</script>

<svelte:window bind:scrollY />

<div
	class={`
		sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 ${
			switchNavbarStyle
				? 'bg-base-100 text-base-content shadow-sm'
				: 'bg-base-100 text-base-content'
		}`}
>
	<nav class="navbar w-full">
		<div class="flex flex-1 md:gap-1 lg:gap-2">
			{#if showMenuButton}
				<span
					class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
					data-tip={$LL.ui.menu.menu()}
				>
					<label
						aria-label={$LL.ui.menu.open()}
						for="drawer"
						class="btn btn-square btn-ghost drawer-button lg:hidden"
					>
						<Icon src={Bars4} class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6" />
					</label>
				</span>
			{/if}
			<div class="flex items-center gap-2 lg:hidden">
				<slot name="logo" />
			</div>
			<div class="hidden w-full max-w-sm lg:flex">
				<slot name="search" />
			</div>
		</div>
		<div class="flex-0">
			<slot name="option1" />
			<slot name="option2" />
			<slot name="option3" />
			<slot name="option4" />
			<slot name="option5" />
		</div>
	</nav>
</div>
