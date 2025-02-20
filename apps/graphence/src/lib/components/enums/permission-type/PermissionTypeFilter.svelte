<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression } from '@graphace/graphql';
	import { EnumFilter } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: StringExpression | null | undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	$: enums = [
		{ name: $LL.graphql.enums.PermissionType.values.READ.name(), value: 'READ', description: '读取' },
		{ name: $LL.graphql.enums.PermissionType.values.WRITE.name(), value: 'WRITE', description: '写入' }
	];
</script>

<EnumFilter bind:value {name} {enums} {label} {className} {selectClassName} />
