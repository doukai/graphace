<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { read, utils, writeFileXLSX } from 'xlsx';
	import { format } from 'date-fns';
	import { melt } from '@melt-ui/svelte';
	import { Button, Dialog, FormControl, ModalAction } from '@graphace/ui';
	import MaterialSymbols from '../icons/MaterialSymbols.svelte';
	import LL from '~/lib/i18n/i18n-svelte';

	export let templates: Record<string, string> | undefined = undefined;
	export let close: (() => void) | undefined = undefined;
	const dispatch = createEventDispatcher<{
		import: {
			json: Record<string, string | null | undefined>[];
			writeErrorsFile: typeof writeErrorsFile;
			template?: string | undefined;
		};
	}>();

	let template: string | undefined;
	let file: File | undefined;
	let errorFileName: string | undefined;

	const writeErrorsFile = (
		fileName: string,
		json: Record<string, string | null | undefined>[],
		errors: Record<string, ((string | undefined)[] | undefined)[]>
	) => {
		const ws = utils.json_to_sheet(json || []);
		const wb = utils.book_new();
		for (const [key, cols] of Object.entries(errors)) {
			const row = Number(key);
			for (let col = 0; col < cols.length; col++) {
				const messages = cols[col];
				if (messages && messages.length) {
					const cell = utils.encode_cell({
						r: row + 1,
						c: col
					});
					if (ws[cell]) {
						ws[cell].c = messages.map((message) => ({ t: message }));
					} else {
						ws[cell] = {
							c: messages.map((message) => ({ t: message }))
						};
					}
				}
			}
		}

		utils.book_append_sheet(wb, ws, fileName);

		errorFileName = `${$LL.graphence.components.moduleMenu.errorFileName({
			file: fileName
		})}_${format(new Date(), 'yyMMddHHmmss')}.xlsx`;

		writeFileXLSX(wb, errorFileName);
	};

	const importFile = async (file: File) => {
		const data = await file.arrayBuffer();
		const wb = read(data);
		const json: Record<string, string | null | undefined>[] = utils.sheet_to_json(
			wb.Sheets[wb.SheetNames[0]]
		);
		dispatch('import', { json, writeErrorsFile, template });
	};
</script>

<Dialog title={$LL.graphence.components.moduleMenu.import()} bind:close>
	<li slot="trigger" let:trigger>
		<a use:melt={trigger} href={null}>
			<MaterialSymbols icon="file-upload" />
			<span>{$LL.graphence.components.moduleMenu.import()}</span>
		</a>
	</li>
	<div class="py-4">
		{#if templates}
			<FormControl let:id>
				<label for={id} class="label">
					<span class="label-text">{$LL.graphence.components.moduleMenu.template()}</span>
				</label>
				<select
					{id}
					class="select select-bordered"
					bind:value={template}
					on:change={(e) => (file = undefined)}
				>
					{#each Object.entries(templates) as [value, label]}
						<option {value}>{label}</option>
					{/each}
				</select>
			</FormControl>
		{/if}
		<FormControl let:id>
			<label for={id} class="label">
				<span class="label-text">{$LL.graphence.components.moduleMenu.file()}</span>
			</label>
			<input
				{id}
				type="file"
				class="file-input file-input-bordered min-w-80"
				on:change={(e) => {
					errorFileName = undefined;
					if (e.currentTarget?.files?.[0]) {
						file = e.currentTarget?.files?.[0];
					}
				}}
			/>
			{#if errorFileName}
				<label data-part="label" for={id} class="label">
					<span data-part="label-text-alt" class="label-text-alt">
						<p data-part="label-text" class="text-error">
							{$LL.errors.xlsx.importFailed({ file: errorFileName })}
						</p>
					</span>
				</label>
			{/if}
		</FormControl>
	</div>
	<ModalAction>
		<Button
			text={$LL.graphence.components.moduleMenu.import()}
			color="neutral"
			disabled={file === undefined}
			on:click={(e) => {
				if (file) {
					importFile(file);
				}
			}}
		/>
	</ModalAction>
</Dialog>
