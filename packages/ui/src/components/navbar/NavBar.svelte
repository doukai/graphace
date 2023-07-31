<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bars4 } from '@steeze-ui/heroicons';
	import Iconify from '@iconify/svelte';

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
			<span
				class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
				data-tip="Menu"
			>
				<label
					aria-label="Open menu"
					for="drawer"
					class="btn btn-square btn-ghost drawer-button lg:hidden"
				>
					<Icon src={Bars4} class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6" />
				</label>
			</span>
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
		</div>
	</nav>
</div>
