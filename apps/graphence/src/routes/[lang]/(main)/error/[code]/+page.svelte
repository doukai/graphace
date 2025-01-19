<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="grid h-screen place-content-center bg-base-200 px-4">
	<div class="text-center">
		<h1 class="text-9xl font-black text-neutral-content">{data.code}</h1>

		<p class="text-2xl font-bold tracking-tight text-neutral sm:text-4xl">Uh-oh!</p>

		<p class="mt-4 text-base-content">We can't find that page.</p>

		<button class="btn btn-neutral mt-6">Primary</button>
	</div>
</div>
