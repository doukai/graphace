<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Sort } from '@graphace/graphql';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let value: Sort | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

<select class="select select-bordered {className}" bind:value>
	<option value={undefined} selected>{$LL.ui_graphql.table.th.noSort()}</option>
	<option value="ASC">{$LL.ui_graphql.table.th.asc()}</option>
	<option value="DESC">{$LL.ui_graphql.table.th.desc()}</option>
</select>
