<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { EnumTh } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let name: string;
	export let value: StringExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;
	export let disabled = false;
	export let required: boolean | undefined = false;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	$: enums = [
		{ name: $LL.graphql.enums.DataPermissionLevel.values.ALL.name(), value: 'ALL', description: '全部' },
		{ name: $LL.graphql.enums.DataPermissionLevel.values.SAME_LEVEL.name(), value: 'SAME_LEVEL', description: '同级' },
		{ name: $LL.graphql.enums.DataPermissionLevel.values.SAME_AND_LOWER.name(), value: 'SAME_AND_LOWER', description: '同级与下级' },
		{ name: $LL.graphql.enums.DataPermissionLevel.values.LOWER_ONLY.name(), value: 'LOWER_ONLY', description: '仅下级' }
	];
</script>

<EnumTh {name} bind:value bind:sort {enums} {disabled} {required} {zIndex} class={className} on:filter />