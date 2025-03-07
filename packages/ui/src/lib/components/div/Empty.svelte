<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	let className: string | undefined = 'badge-ghost';
	export { className as class };

	const contextClass = getContext<string>('ui.empty') || '';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

<div class="flex justify-center content-center w-full h-full">
	<span class="badge {className} {contextClass}">{$LL.ui.message.empty()}</span>
</div>
