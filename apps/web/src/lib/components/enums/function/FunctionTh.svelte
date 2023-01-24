<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Function } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined;

	let enums = [
		{ name: Function.AVG, value: Function.AVG },
		{ name: Function.COUNT, value: Function.COUNT },
		{ name: Function.MAX, value: Function.MAX },
		{ name: Function.MIN, value: Function.MIN },
		{ name: Function.SUM, value: Function.SUM }
	];
</script>

<EnumTh {name} {enums} {expression} {sort} />