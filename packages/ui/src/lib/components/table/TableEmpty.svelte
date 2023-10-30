<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	export let cols: number;
</script>

<tr>
	<td colspan={cols}>
		<div class="flex justify-center">
			<span class="badge badge-ghost">{$LL.ui.table.empty()}</span>
		</div>
	</td>
</tr>
