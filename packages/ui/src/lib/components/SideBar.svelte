<script lang="ts">
	export let drawerSidebarScrollY: number;
	$: switchNavbarStyle = drawerSidebarScrollY > 40 ? true : false;
</script>

<div
	class={`bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ${
		switchNavbarStyle ? 'shadow-sm' : ''
	}`}
>
	<slot name="logo" />
</div>

<div
	class={`lg:hidden bg-base-100 grid-row-2 sticky top-0 z-10 grid w-full gap-y-2 bg-opacity-90 px-2 py-3 backdrop-blur ${
		switchNavbarStyle ? 'shadow-sm' : ''
	}`}
>
	<div class="flex w-full">
		<slot name="search" />
	</div>
</div>

<div class="h-4" />

<ul class="menu menu-sm lg:menu-md px-4 py-0">
	<slot name="items" />
</ul>
