<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { EnumInput } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	$: enums = [
		{ name: $LL.graphql.enums.PermissionType.values.READ.name(), value: 'READ', description: '读取' },
		{ name: $LL.graphql.enums.PermissionType.values.WRITE.name(), value: 'WRITE', description: '写入' },
		{ name: $LL.graphql.enums.PermissionType.values.ANY.name(), value: 'ANY', description: '全部' }
	];
</script>

<EnumInput {id} {name} bind:value {list} {enums} {errors} {readonly} {disabled} {placeholder} class={className} />
