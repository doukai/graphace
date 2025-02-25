<script lang="ts">
	import type { StringExpression } from '@graphace/graphql';
	import { StringFilter } from '.';

	export let value: StringExpression | null | undefined = undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	export let addBtnClassName: string = '';
</script>

<StringFilter bind:value {name} {label} {className} {selectClassName} {addBtnClassName} />
