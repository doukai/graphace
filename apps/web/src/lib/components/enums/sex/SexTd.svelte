<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { Sex } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	let enums = [
		{ name: Sex.FEMALE, value: Sex.FEMALE },
		{ name: Sex.MAN, value: Sex.MAN }
	];
</script>

<EnumTd bind:value {list} {enums} {name} {error} {readonly} {disabled} {placeholder} />
