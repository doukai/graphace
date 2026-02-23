<script lang="ts">
	import { init } from '@graphace/ui';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid place-content-center bg-base-200 h-full">
	<div class="text-center space-y-4">
		<h1 class="text-9xl font-black text-neutral-content">{data.code}</h1>
		<p class="text-2xl font-bold tracking-tight text-neutral">
			{$LL.errors.http[data.code]() || $LL.errors.http.unknown()}
		</p>
		<button
			on:click|preventDefault={(e) => {
				init(`/${$locale}`);
			}}
			class="btn btn-outline">{$LL.graphence.path.home()}</button
		>
	</div>
</div>
