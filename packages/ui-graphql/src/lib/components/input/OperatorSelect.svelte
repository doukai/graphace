<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Operator } from '@graphace/graphql';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let value: Operator | undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

<select class="select select-bordered {className}" bind:value on:change>
	<option value={undefined} />
	<option value="EQ" selected>{$LL.ui_graphql.table.th.eq()}</option>
	<option value="NEQ">{$LL.ui_graphql.table.th.neq()}</option>
	<option value="LK">{$LL.ui_graphql.table.th.lk()}</option>
	<option value="NLK">{$LL.ui_graphql.table.th.nlk()}</option>
	<option value="GT">{$LL.ui_graphql.table.th.gt()}</option>
	<option value="GTE">{$LL.ui_graphql.table.th.gte()}</option>
	<option value="LT">{$LL.ui_graphql.table.th.lt()}</option>
	<option value="LTE">{$LL.ui_graphql.table.th.lte()}</option>
	<option value="NIL">{$LL.ui_graphql.table.th.nil()}</option>
	<option value="NNIL">{$LL.ui_graphql.table.th.nnil()}</option>
	<option value="IN">{$LL.ui_graphql.table.th.in()}</option>
	<option value="NIN">{$LL.ui_graphql.table.th.nin()}</option>
	<option value="BT">{$LL.ui_graphql.table.th.bt()}</option>
	<option value="NBT">{$LL.ui_graphql.table.th.nbt()}</option>
</select>
