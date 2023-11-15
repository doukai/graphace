<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { EnumTd } from '@graphace/ui-graphql';
	import LL from '$i18n/i18n-svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	$: enums = [
		{ name: $LL.graphql.enums.PermissionType.values.READ.name(), value: 'READ', description: '读取' },
		{ name: $LL.graphql.enums.PermissionType.values.WRITE.name(), value: 'WRITE', description: '写入' }
	];
</script>

<EnumTd bind:value {list} {enums} {name} {errors} {readonly} {disabled} {placeholder} on:save />
