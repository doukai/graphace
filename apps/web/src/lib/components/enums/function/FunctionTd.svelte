<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { Function } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
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

<EnumTd {value} {enums} {name} {error} {placeholder} />
