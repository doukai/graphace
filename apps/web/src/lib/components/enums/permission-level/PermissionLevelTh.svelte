<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { PermissionLevel } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	$: enums = [
		{ name: $LL.graphql.enums.PermissionLevel.values.USER.name(), value: 'USER' },
		{ name: $LL.graphql.enums.PermissionLevel.values.GROUP.name(), value: 'GROUP' },
		{ name: $LL.graphql.enums.PermissionLevel.values.SUB_GROUP.name(), value: 'SUB_GROUP' },
		{ name: $LL.graphql.enums.PermissionLevel.values.REALM.name(), value: 'REALM' },
		{ name: $LL.graphql.enums.PermissionLevel.values.ALL.name(), value: 'ALL' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />