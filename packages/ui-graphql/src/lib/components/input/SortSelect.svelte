<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Sort } from '@graphace/graphql';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: Sort | null | undefined = undefined;
	export let disabled = false;
	let className: string | undefined = 'select-bordered';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

<select {id} {name} class="select {className}" {disabled} bind:value>
	<option value={undefined} selected>{$LL.ui_graphql.table.th.noSort()}</option>
	<option value="ASC">{$LL.ui_graphql.table.th.asc()}</option>
	<option value="DESC">{$LL.ui_graphql.table.th.desc()}</option>
</select>
