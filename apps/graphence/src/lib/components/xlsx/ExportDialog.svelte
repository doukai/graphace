<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { utils, writeFileXLSX } from 'xlsx';
	import { format } from 'date-fns';
	import { melt } from '@melt-ui/svelte';
	import { Button, Dialog, FormControl, ModalAction } from '@graphace/ui';
	import MaterialSymbols from '../icons/MaterialSymbols.svelte';
	import LL from '~/lib/i18n/i18n-svelte';

	export let templates: Record<string, string> | undefined = undefined;
	export let pageSizeOptions: number[] = [100, 300, 500];
	export let close: (() => void) | undefined = undefined;

	const writeFile = (fileName: string, json: Record<string, string | null | undefined>[]) => {
		const ws = utils.json_to_sheet(json || []);
		const wb = utils.book_new();
		utils.book_append_sheet(wb, ws, fileName);
		writeFileXLSX(wb, `${fileName}_${format(new Date(), 'yyMMddHHmmss')}.xlsx`);
		if (close) {
			close();
		}
	};

	const dispatch = createEventDispatcher<{
		export: {
			pageSize: number;
			writeFile: typeof writeFile;
			template?: string | undefined;
		};
		template: {
			writeFile: typeof writeFile;
			template?: string | undefined;
		};
	}>();

	let pageSize: number = pageSizeOptions[0];
	let template: string | undefined;
</script>

<Dialog title={$LL.graphence.components.moduleMenu.export()} bind:close>
	<li slot="trigger" let:trigger>
		<a use:melt={trigger} href={null}>
			<MaterialSymbols icon="file-download" />
			<span>{$LL.graphence.components.moduleMenu.export()}</span>
		</a>
	</li>
	{#if templates}
		<FormControl let:id>
			<label for={id} class="label">
				<span class="label-text">{$LL.graphence.components.moduleMenu.template()}</span>
			</label>
			<select {id} class="select select-bordered" bind:value={template}>
				{#each Object.entries(templates) as [value, label]}
					<option {value}>{label}</option>
				{/each}
			</select>
		</FormControl>
	{/if}
	<FormControl let:id>
		<label for={id} class="label">
			<span class="label-text">{$LL.graphence.components.moduleMenu.size()}</span>
		</label>
		<select class="select select-bordered min-w-80" bind:value={pageSize}>
			{#each pageSizeOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</FormControl>
	<ModalAction>
		<Button
			text={$LL.graphence.components.moduleMenu.export()}
			color="neutral"
			on:click={(e) => dispatch('export', { pageSize, writeFile, template })}
		/>
		<Button
			text={$LL.graphence.components.moduleMenu.template()}
			color="primary"
			on:click={(e) => dispatch('template', { writeFile, template })}
		/>
	</ModalAction>
</Dialog>
