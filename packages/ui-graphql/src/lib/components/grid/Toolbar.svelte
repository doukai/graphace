<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createToolbar, melt } from '@melt-ui/svelte';
	import { Dialog } from '@graphace/ui';
	import type { Field } from '@graphace/graphql';
	import type { Cell, DataType } from '@revolist/svelte-datagrid';

	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let fields: Field[] = [];
	export let source: DataType[] = [];
	export let idFieldName: string;
	export let rowIndex: number | undefined = undefined;
	export let colIndex: number | undefined = undefined;
	export let pageSize: number = 10;
	export let setCellsFocus: (
		cellStart?: Cell,
		cellEnd?: Cell,
		colType?: string,
		rowType?: string
	) => Promise<void>;

	let file: File;

	const dispatch = createEventDispatcher<{
		query: {};
		mutation: {};
		export: {};
		import: { file: File };
		change: { source: DataType[] };
	}>();

	const {
		elements: { root, button, link, separator },
		builders: { createToolbarGroup }
	} = createToolbar();
</script>

<div use:melt={$root} class="flex p-1 bg-base-200 rounded space-x-1">
	<button class="btn btn-xs" use:melt={$button} on:click={(e) => dispatch('query', {})}>
		{$LL.ui_graphql.grid.buttons.refresh()}
	</button>
	<button
		class="btn btn-xs btn-secondary"
		use:melt={$button}
		on:click={(e) => dispatch('mutation', {})}
	>
		{$LL.ui_graphql.grid.buttons.save()}
	</button>
	<div class="hidden md:divider md:divider-horizontal md:m-0" use:melt={$separator} />
	<button
		class="btn btn-xs btn-primary pt-0"
		use:melt={$button}
		disabled={fields.length === 0}
		on:click={(e) => {
			source = [
				...Array(pageSize)
					.fill(undefined)
					.map(() => ({}))
			];
			dispatch('change', { source });
		}}
	>
		{$LL.ui_graphql.grid.buttons.new()}
	</button>
	<button
		class="btn btn-xs btn-primary"
		use:melt={$button}
		disabled={fields.length === 0}
		on:click={(e) => {
			source = [...source, {}];
			dispatch('change', { source });
		}}
	>
		{$LL.ui_graphql.grid.buttons.append()}
	</button>
	{#if rowIndex !== undefined && source[rowIndex]?.isDeprecated === true}
		<button
			on:click={(e) => {
				if (rowIndex !== undefined) {
					source[rowIndex].isDeprecated = undefined;
					dispatch('change', { source });
					setCellsFocus(
						{ x: colIndex || 0, y: rowIndex || 0 },
						{ x: colIndex || 0, y: rowIndex || 0 }
					);
				}
			}}
			class="btn btn-xs btn-success"
			use:melt={$button}
		>
			{$LL.ui_graphql.grid.buttons.canel()}
		</button>
	{/if}
	{#if rowIndex !== undefined && !source[rowIndex]?.isDeprecated}
		<button
			on:click={(e) => {
				if (rowIndex !== undefined) {
					if (source[rowIndex]?.[idFieldName]) {
						source[rowIndex].isDeprecated = true;
						setCellsFocus(
							{ x: colIndex || 0, y: rowIndex || 0 },
							{ x: colIndex || 0, y: rowIndex || 0 }
						);
					} else {
						source.splice(rowIndex, 1);
						source = [...source];
					}
					dispatch('change', { source });
				}
			}}
			class="btn btn-xs btn-error"
			use:melt={$button}
		>
			{$LL.ui_graphql.grid.buttons.remove()}
		</button>
	{/if}
	<div class="hidden md:divider md:divider-horizontal md:m-0" use:melt={$separator} />
	<button
		on:click={(e) => dispatch('export', { source })}
		class="btn btn-xs btn-info"
		use:melt={$button}
		disabled={fields.length === 0}
	>
		{$LL.ui_graphql.grid.buttons.export()}
	</button>
	<Dialog
		title={$LL.ui_graphql.grid.buttons.import()}
		className="btn-xs btn-info"
		disabled={fields.length === 0}
	>
		<span slot="button">{$LL.ui_graphql.grid.buttons.import()}</span>
		<input
			type="file"
			class="file-input file-input-bordered w-full"
			on:change={(e) => {
				if (e.currentTarget?.files?.[0]) {
					file = e.currentTarget?.files?.[0];
				}
			}}
		/>
		<button
			slot="action"
			on:click={(e) => dispatch('import', { file })}
			class="btn"
			use:melt={$button}
		>
			{$LL.ui_graphql.grid.buttons.ok()}
		</button>
	</Dialog>
</div>
