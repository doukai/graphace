<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { PermissionLevel } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	$: enums = [
		{ name: $LL.graphql.enums.PermissionLevel.values.USER.name(), value: 'USER' },
		{ name: $LL.graphql.enums.PermissionLevel.values.GROUP.name(), value: 'GROUP' },
		{ name: $LL.graphql.enums.PermissionLevel.values.SUB_GROUP.name(), value: 'SUB_GROUP' },
		{ name: $LL.graphql.enums.PermissionLevel.values.REALM.name(), value: 'REALM' },
		{ name: $LL.graphql.enums.PermissionLevel.values.ALL.name(), value: 'ALL' }
	];
</script>

<EnumTd bind:value {list} {enums} {name} {errors} {readonly} {disabled} {placeholder} on:save />
