<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { MenuType } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	$: enums = [
		{ name: $LL.graphql.enums.MenuType.values.FOLDER.name(), value: 'FOLDER' },
		{ name: $LL.graphql.enums.MenuType.values.PAGE.name(), value: 'PAGE' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />