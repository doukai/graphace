<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { EnumInput } from '@graphace/ui-graphql/components/input';
	import LL from '$i18n/i18n-svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let containerClassName: string = '';
	export let className: string = '';

	$: enums = [
		{ name: $LL.graphql.enums.Func.values.COUNT.name(), value: 'COUNT' },
		{ name: $LL.graphql.enums.Func.values.MAX.name(), value: 'MAX' },
		{ name: $LL.graphql.enums.Func.values.MIN.name(), value: 'MIN' },
		{ name: $LL.graphql.enums.Func.values.SUM.name(), value: 'SUM' },
		{ name: $LL.graphql.enums.Func.values.AVG.name(), value: 'AVG' }
	];
</script>

<EnumInput bind:value {list} {enums} {name} {errors} {readonly} {disabled} {placeholder} {containerClassName} {className} />
