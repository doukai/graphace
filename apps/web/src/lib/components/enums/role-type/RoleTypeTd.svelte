<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { RoleType } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';

	let enums = [
		{ name: RoleType.ADMIN, value: RoleType.ADMIN },
		{ name: RoleType.ANONYMOUS, value: RoleType.ANONYMOUS },
		{ name: RoleType.USER, value: RoleType.USER }
	];
</script>

<EnumTd {value} {enums} {name} {error} {placeholder} />
