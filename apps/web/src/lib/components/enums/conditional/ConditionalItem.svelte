<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumItem } from '@graphace/ui-graphql/components/form';
	import { Conditional } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';

	let enums = [
		{ name: Conditional.AND, value: Conditional.AND },
		{ name: Conditional.OR, value: Conditional.OR }
	];
</script>

<EnumItem {value} {enums} {name} {label} {error} {placeholder} />
