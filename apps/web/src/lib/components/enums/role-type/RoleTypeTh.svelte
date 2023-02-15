<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { RoleType } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	let enums = [
		{ name: RoleType.ADMIN, value: RoleType.ADMIN },
		{ name: RoleType.ANONYMOUS, value: RoleType.ANONYMOUS },
		{ name: RoleType.USER, value: RoleType.USER }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort />