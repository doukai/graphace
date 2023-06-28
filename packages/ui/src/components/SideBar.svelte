<script lang="ts">
	import Iconify from '@iconify/svelte';
</script>

<div
	class={`bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex`}
>
	<a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2">
		<svg width="32" height="32" viewBox="0 0 415 415" xmlns="http://www.w3.org/2000/svg">
			<rect x="82.5" y="290" width="250" height="125" rx="62.5" fill="#1AD1A5" />
			<circle cx="207.5" cy="135" r="130" fill="black" fill-opacity=".3" />
			<circle cx="207.5" cy="135" r="125" fill="white" />
			<circle cx="207.5" cy="135" r="56" fill="#FF9903" />
		</svg>

		<div class="font-title inline-flex text-lg md:text-2xl">
			<span class="lowercase">graph</span>
			<span class="uppercase text-[#E535AB]">UI</span>
		</div>
	</a>
</div>

<div
	class={`bg-base-100 grid-row-2 sticky top-0 z-10 grid w-full gap-y-2 bg-opacity-90 px-2 py-3 backdrop-blur`}
>
	<div class="flex w-full">
		<slot name="search" />
	</div>
</div>

<div class="h-4" />

<ul class="menu menu-sm lg:menu-md px-4 py-0">
	<slot name=items/>
</ul>

<!-- <div class="navbar text-neutral-content shadow">
	<a class="btn btn-ghost normal-case text-xl" href={null}>
		<Iconify class="h-8 mr-3 w-auto" icon="logos:graphql" />
		Graphace
	</a>
</div>
<div class="flex-1 flex flex-col items-center overflow-y-auto">
	<ul class="menu menu-lg w-56 p-1">
		<slot />
	</ul>
</div> -->
