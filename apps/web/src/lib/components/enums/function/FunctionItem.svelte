<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumItem } from '@graphace/ui-graphql/components/form';
	import { Function } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';

	let enums = [
		{ name: Function.AVG, value: Function.AVG },
		{ name: Function.COUNT, value: Function.COUNT },
		{ name: Function.MAX, value: Function.MAX },
		{ name: Function.MIN, value: Function.MIN },
		{ name: Function.SUM, value: Function.SUM }
	];
</script>

<EnumItem {value} {enums} {name} {label} {error} {placeholder} />
