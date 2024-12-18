<script lang="ts">
	import type { StringExpression } from '@graphace/graphql';
	import { DateTimeFilter } from '.';

	export let expression: StringExpression | null | undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	export let addBtnClassName: string = '';
</script>

<DateTimeFilter bind:expression {name} {label} {className} {selectClassName} {addBtnClassName} />
