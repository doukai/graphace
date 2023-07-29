<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { PermissionLevel } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	let enums = [
		{ name: 'READ', value: 'READ' },
		{ name: 'WRITE', value: 'WRITE' }
	];
</script>

<EnumTd bind:value {list} {enums} {name} {errors} {readonly} {disabled} {placeholder} on:save />
