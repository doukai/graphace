<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { Sort } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';

	let enums = [
		{ name: Sort.ASC, value: Sort.ASC },
		{ name: Sort.DESC, value: Sort.DESC }
	];
</script>

<EnumTd {value} {enums} {name} {error} {placeholder} />
