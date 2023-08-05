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
		{ name: $LL.graphql.enums.PermissionLevel.values.USER.name(), value: 'USER' },
		{ name: $LL.graphql.enums.PermissionLevel.values.GROUP.name(), value: 'GROUP' },
		{ name: $LL.graphql.enums.PermissionLevel.values.SUB_GROUP.name(), value: 'SUB_GROUP' },
		{ name: $LL.graphql.enums.PermissionLevel.values.REALM.name(), value: 'REALM' },
		{ name: $LL.graphql.enums.PermissionLevel.values.ALL.name(), value: 'ALL' }
	];
</script>

<EnumItem bind:value {list} {enums} {name} {label} {errors} {readonly} {disabled} {placeholder} />
