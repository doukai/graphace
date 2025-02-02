<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { EnumTh } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	$: enums = [
		{ name: $LL.graphql.enums.PermissionType.values.READ.name(), value: 'READ', description: '读取' },
		{ name: $LL.graphql.enums.PermissionType.values.WRITE.name(), value: 'WRITE', description: '写入' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />