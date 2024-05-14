<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { EnumItem } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	$: enums = [
		{ name: $LL.graphql.enums.PermissionType.values.READ.name(), value: 'READ', description: '读取' },
		{ name: $LL.graphql.enums.PermissionType.values.WRITE.name(), value: 'WRITE', description: '写入' }
	];
</script>

<EnumItem bind:value {list} {enums} {name} {label} {errors} {readonly} {disabled} {placeholder} />
