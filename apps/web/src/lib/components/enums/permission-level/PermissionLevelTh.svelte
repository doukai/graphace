<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { PermissionLevel } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	let enums = [
		{ name: PermissionLevel.READ, value: PermissionLevel.READ },
		{ name: PermissionLevel.WRITE, value: PermissionLevel.WRITE }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort />