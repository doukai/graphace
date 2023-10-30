<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	export let className: string = '';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let value:
		| 'EQ'
		| 'NEQ'
		| 'LK'
		| 'NLK'
		| 'GT'
		| 'NLTE'
		| 'GTE'
		| 'NLT'
		| 'LT'
		| 'NGTE'
		| 'LTE'
		| 'NGT'
		| 'NIL'
		| 'NNIL'
		| 'IN'
		| 'NIN'
		| 'BT'
		| 'NBT'
		| null
		| undefined;
</script>

<select class="select select-bordered {className}" bind:value on:change>
	<option value="EQ" selected>{$LL.uiGraphql.table.th.eq()}</option>
	<option value="NEQ">{$LL.uiGraphql.table.th.neq()}</option>
	<option value="LK">{$LL.uiGraphql.table.th.lk()}</option>
	<option value="NLK">{$LL.uiGraphql.table.th.nlk()}</option>
	<option value="GT">{$LL.uiGraphql.table.th.gt()}</option>
	<option value="GTE">{$LL.uiGraphql.table.th.gte()}</option>
	<option value="LT">{$LL.uiGraphql.table.th.lt()}</option>
	<option value="LTE">{$LL.uiGraphql.table.th.lte()}</option>
	<option value="NIL">{$LL.uiGraphql.table.th.nil()}</option>
	<option value="NNIL">{$LL.uiGraphql.table.th.nnil()}</option>
	<option value="IN">{$LL.uiGraphql.table.th.in()}</option>
	<option value="NIN">{$LL.uiGraphql.table.th.nin()}</option>
	<option value="BT">{$LL.uiGraphql.table.th.bt()}</option>
	<option value="NBT">{$LL.uiGraphql.table.th.nbt()}</option>
</select>
