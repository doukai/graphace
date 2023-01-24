<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { Sex } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';

	let enums = [
		{ name: Sex.FEMALE, value: Sex.FEMALE },
		{ name: Sex.MAN, value: Sex.MAN }
	];
</script>

<EnumTd {value} {enums} {name} {error} {placeholder} />
