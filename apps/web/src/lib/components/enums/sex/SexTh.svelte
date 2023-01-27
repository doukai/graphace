<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Sex } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined;

	let enums = [
		{ name: Sex.FEMALE, value: Sex.FEMALE },
		{ name: Sex.MAN, value: Sex.MAN }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort />