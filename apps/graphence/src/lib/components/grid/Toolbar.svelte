<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createToolbar, melt } from '@melt-ui/svelte';
	import type { Field } from '@graphace/graphql';
	import type { Cell, DataType } from '@revolist/svelte-datagrid';

	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let fields: Field[] = [];
	export let source: DataType[];
	export let rowIndex: number | undefined = undefined;
	export let colIndex: number | undefined = undefined;
	export let pageSize: number = 10;
	export let setCellsFocus: (
		cellStart?: Cell,
		cellEnd?: Cell,
		colType?: string,
		rowType?: string
	) => Promise<void>;

	const dispatch = createEventDispatcher<{
		query: {};
		mutation: {};
	}>();

	const {
		elements: { root, button, link, separator },
		builders: { createToolbarGroup }
	} = createToolbar();
</script>

<div use:melt={$root} class="flex p-1 bg-base-300 rounded space-x-1">
	<button class="btn btn-xs" use:melt={$button} on:click={(e) => dispatch('query', {})}>
		{$LL.graphence.components.grid.buttons.refresh()}
	</button>
	<button
		class="btn btn-xs btn-secondary"
		use:melt={$button}
		on:click={(e) => dispatch('mutation', {})}
	>
		{$LL.graphence.components.grid.buttons.save()}
	</button>
	<div class="divider divider-horizontal m-0" use:melt={$separator} />
	<button
		class="btn btn-xs btn-primary pt-0"
		use:melt={$button}
		disabled={fields.length === 0}
		on:click={(e) => {
			source = [...Array(pageSize).map(() => ({}))];
		}}
	>
		{$LL.graphence.components.grid.buttons.new()}
	</button>
	<button
		class="btn btn-xs btn-primary"
		use:melt={$button}
		disabled={rowIndex === undefined}
		on:click={(e) => {
			if (rowIndex !== undefined) {
				source.splice(rowIndex, 0, {});
				source = [...source];
				setCellsFocus(
					{ x: colIndex || 0, y: rowIndex || 0 },
					{ x: colIndex || 0, y: rowIndex || 0 }
				);
			}
		}}
	>
		{$LL.graphence.components.grid.buttons.InsertAbove()}
	</button>
	<button
		class="btn btn-xs btn-primary"
		use:melt={$button}
		disabled={rowIndex === undefined}
		on:click={(e) => {
			if (rowIndex !== undefined) {
				source.splice(rowIndex + 1, 0, {});
				source = [...source];
				setCellsFocus(
					{ x: colIndex || 0, y: rowIndex + 1 || 0 },
					{ x: colIndex || 0, y: rowIndex + 1 || 0 }
				);
			}
		}}
	>
		{$LL.graphence.components.grid.buttons.InsertBelow()}
	</button>
	<button
		class="btn btn-xs btn-primary"
		use:melt={$button}
		disabled={fields.length === 0}
		on:click={(e) => {
			source = [...source, {}];
		}}
	>
		{$LL.graphence.components.grid.buttons.append()}
	</button>
	<div class="divider divider-horizontal m-0" use:melt={$separator} />
	<button
		disabled={rowIndex === undefined || source[rowIndex]?.isDeprecated === true}
		on:click={(e) => {
			if (rowIndex !== undefined) {
				source[rowIndex].isDeprecated = true;
				setCellsFocus(
					{ x: colIndex || 0, y: rowIndex || 0 },
					{ x: colIndex || 0, y: rowIndex || 0 }
				);
			}
		}}
		class="btn btn-xs btn-error"
		use:melt={$button}
	>
		{$LL.graphence.components.grid.buttons.remove()}
	</button>
	<button
		disabled={rowIndex === undefined || !source[rowIndex]?.isDeprecated}
		on:click={(e) => {
			if (rowIndex !== undefined) {
				source[rowIndex].isDeprecated = undefined;
				setCellsFocus(
					{ x: colIndex || 0, y: rowIndex || 0 },
					{ x: colIndex || 0, y: rowIndex || 0 }
				);
			}
		}}
		class="btn btn-xs btn-success"
		use:melt={$button}
	>
		{$LL.graphence.components.grid.buttons.canel()}
	</button>
</div>
