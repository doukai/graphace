<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression } from '@graphace/graphql';
	import { EnumFilter } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: StringExpression | null | undefined = undefined;
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

<EnumFilter {id} {name} bind:value {enums} class={className} />
