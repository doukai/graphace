<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	export let cols: number;
	let className: string | undefined = 'badge-ghost';
	export { className as class };

	const contextClass = getContext<string>('ui.table-empty') || '';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

<tr>
	<td colspan={cols}>
		<div class="flex justify-center">
			<span class="badge {className} {contextClass}">{$LL.ui.table.empty()}</span>
		</div>
	</td>
</tr>
