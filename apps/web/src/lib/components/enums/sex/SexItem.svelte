<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumItem } from '@graphace/ui-graphql/components/form';
	import { Sex } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';

	let enums = [
		{ name: Sex.FEMALE, value: Sex.FEMALE },
		{ name: Sex.MAN, value: Sex.MAN }
	];
</script>

<EnumItem bind:value {enums} {name} {label} {error} {placeholder} />
