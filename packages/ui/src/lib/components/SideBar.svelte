<script lang="ts">
	import { z_index } from '~';

	export let drawerSidebarScrollY: number;

	$: switchNavbarStyle = drawerSidebarScrollY > 40 ? true : false;
	const z_class = z_index.top(1);
	const z_class2 = z_index.top(2);
</script>

<div
	class={`bg-base-100 sticky top-0 ${z_class2} hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ${
		switchNavbarStyle ? 'shadow-sm' : ''
	}`}
>
	<slot name="logo" />
</div>

<div
	class={`lg:hidden bg-base-100 grid-row-2 sticky top-0 ${z_class} grid w-full gap-y-2 bg-opacity-90 px-2 py-3 backdrop-blur ${
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
