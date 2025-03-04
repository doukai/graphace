<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let totalCount: number = 0;
	let className: string = '';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const contextClass = getContext<string>('ui.pagination-counter') || '';
</script>

<span class="{className} {contextClass}">
	{$LL.ui.pagination.total({ total: totalCount })}
</span>
