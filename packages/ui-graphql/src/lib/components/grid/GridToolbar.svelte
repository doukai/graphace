<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createToolbar, melt } from '@melt-ui/svelte';
	import type { Cell, DataType } from '@revolist/svelte-datagrid';
	import type { Field } from '@graphace/graphql';
	import { Dialog } from '@graphace/ui';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let fields: Field[] = [];
	export let source: DataType[] = [];
	export let idFieldName: string;
	export let rowIndex: number | undefined = undefined;
	export let colIndex: number | undefined = undefined;
	export let pageSize: number = 10;
	export let loading: boolean = false;
	export let setCellsFocus: (
		cellStart?: Cell,
		cellEnd?: Cell,
		colType?: string,
		rowType?: string
	) => Promise<void>;
	let className: string | undefined = 'min-h-6 space-x-1 bg-base-200';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

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

<div use:melt={$root} class="navbar {className}">
	<button class="btn btn-xs" use:melt={$button} on:click={(e) => dispatch('query', {})}>
		{$LL.ui_graphql.grid.buttons.refresh()}
	</button>
	<button
		class="btn btn-xs btn-secondary"
		use:melt={$button}
		disabled={loading || fields.length === 0}
		on:click={(e) => dispatch('mutation', {})}
	>
		{#if loading}
			<span class="loading loading-xs loading-spinner" />
		{/if}
		{$LL.ui_graphql.grid.buttons.save()}
	</button>
	<div class="divider divider-horizontal mx-0" use:melt={$separator} />
	<button
		class="btn btn-xs btn-primary"
		use:melt={$button}
		disabled={loading || fields.length === 0}
		on:click={(e) => {
			source = [
				...Array(pageSize)
					.fill(undefined)
					.map(() => ({}))
			];
			dispatch('change', { source });
		}}
	>
		{#if loading}
			<span class="loading loading-xs loading-spinner" />
		{/if}
		{$LL.ui_graphql.grid.buttons.new()}
	</button>
	<button
		class="btn btn-xs btn-primary"
		use:melt={$button}
		disabled={loading || fields.length === 0}
		on:click={(e) => {
			source = [...source, {}];
			dispatch('change', { source });
		}}
	>
		{#if loading}
			<span class="loading loading-xs loading-spinner" />
		{/if}
		{$LL.ui_graphql.grid.buttons.append()}
	</button>
	{#if rowIndex !== undefined && source[rowIndex]?.isDeprecated === true}
		<button
			disabled={loading}
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
			{#if loading}
				<span class="loading loading-xs loading-spinner" />
			{/if}
			{$LL.ui_graphql.grid.buttons.canel()}
		</button>
	{/if}
	{#if rowIndex !== undefined && !source[rowIndex]?.isDeprecated}
		<button
			disabled={loading}
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
			{#if loading}
				<span class="loading loading-xs loading-spinner" />
			{/if}
			{$LL.ui_graphql.grid.buttons.remove()}
		</button>
	{/if}
	<div class="divider divider-horizontal mx-0" use:melt={$separator} />
	<button
		on:click={(e) => dispatch('export', { source })}
		class="btn btn-xs btn-info"
		use:melt={$button}
		disabled={fields.length === 0}
	>
		{$LL.ui_graphql.grid.buttons.export()}
	</button>
	<Dialog title={$LL.ui_graphql.grid.buttons.import()}>
		<svelte:fragment slot="trigger" let:trigger>
			<button use:melt={trigger} disabled={fields.length === 0} class="btn btn-xs btn-info">
				{$LL.ui_graphql.grid.buttons.import()}
			</button>
		</svelte:fragment>
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
