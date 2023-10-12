<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { EnumItem } from '@graphace/ui-graphql/components/form';
	import LL from '$i18n/i18n-svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	$: enums = [
		{ name: $LL.graphql.enums.Func.values.COUNT.name(), value: 'COUNT' },
		{ name: $LL.graphql.enums.Func.values.MAX.name(), value: 'MAX' },
		{ name: $LL.graphql.enums.Func.values.MIN.name(), value: 'MIN' },
		{ name: $LL.graphql.enums.Func.values.SUM.name(), value: 'SUM' },
		{ name: $LL.graphql.enums.Func.values.AVG.name(), value: 'AVG' }
	];
</script>

<EnumItem bind:value {list} {enums} {name} {label} {errors} {readonly} {disabled} {placeholder} />
