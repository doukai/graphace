<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Conditional } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined;

	let enums = [
		{ name: Conditional.AND, value: Conditional.AND },
		{ name: Conditional.OR, value: Conditional.OR }
	];
</script>

<EnumTh {name} {enums} {expression} {sort} />