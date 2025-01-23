<script lang="ts">
	import type { PageData } from './$types';
	import { init } from '@graphace/ui';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
</script>

<div class="grid min-h-[calc(100vh-4rem)] place-content-center bg-base-200 px-4">
	<div class="text-center">
		<h1 class="text-9xl font-black text-neutral-content">{data.code}</h1>

		<p class="text-2xl font-bold tracking-tight text-neutral sm:text-4xl">
			{$LL.errors.http[data.code]() || $LL.errors.http.unknown()}
		</p>

		<button
			on:click|preventDefault={(e) => {
				init(`/${$locale}`);
			}}
			class="btn btn-neutral mt-6">{$LL.graphence.path.home()}</button
		>
	</div>
</div>
