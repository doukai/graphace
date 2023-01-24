<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Sort } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined;

	let enums = [
		{ name: Sort.ASC, value: Sort.ASC },
		{ name: Sort.DESC, value: Sort.DESC }
	];
</script>

<EnumTh {name} {enums} {expression} {sort} />