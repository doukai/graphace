<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.empty') || '';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

<div
	data-element="empty"
	data-part="root"
	class="flex justify-center content-center w-full h-full {className} {contextClass}"
>
	<span data-part="badge" class="badge badge-ghost">{$LL.ui.message.empty()}</span>
</div>
