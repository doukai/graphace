<script lang="ts">
	import type { NumberExpression } from '@graphace/graphql';
	import { NumberFilter } from '.';

	export let value: NumberExpression | null | undefined = undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	export let addBtnClassName: string = '';
</script>

<NumberFilter bind:value {name} {label} {className} {selectClassName} {addBtnClassName} />
