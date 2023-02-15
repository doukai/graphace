<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumItem } from '@graphace/ui-graphql/components/form';
	import { Sex } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	let enums = [
		{ name: Sex.FEMALE, value: Sex.FEMALE },
		{ name: Sex.MAN, value: Sex.MAN }
	];
</script>

<EnumItem bind:value {list} {enums} {name} {label} {error} {readonly} {disabled} {placeholder} />
