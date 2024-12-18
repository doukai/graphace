<script lang="ts">
	import type { NumberExpression } from '@graphace/graphql';
	import { NumberFilter } from '.';

	export let expression: NumberExpression | null | undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	export let addBtnClassName: string = '';
</script>

<NumberFilter bind:expression {name} {label} {className} {selectClassName} {addBtnClassName} />
