<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { Conditional } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';

	let enums = [
		{ name: Conditional.AND, value: Conditional.AND },
		{ name: Conditional.OR, value: Conditional.OR }
	];
</script>

<EnumTd {value} {enums} {name} {error} {placeholder} />
