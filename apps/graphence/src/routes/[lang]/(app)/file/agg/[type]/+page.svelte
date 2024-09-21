<script lang="ts">
	import { Card } from '@graphace/ui';
	import FileBar from '~/lib/components/objects/file/FileBar.svelte';
	import FileLine from '~/lib/components/objects/file/FileLine.svelte';
	import FilePie from '~/lib/components/objects/file/FilePie.svelte';
	import type { FileAggStore } from '~/lib/stores/file/fileAggStore';
	import type { PageData } from './$houdini';

	export let data: PageData;

	const {
		fields,
		queryArguments,
		showHeader,
		showFooter,
		showOptionButton,
		showFilterButton,
		showBookmarkButton
	} = data;

	const FileAgg = data.FileAgg as FileAggStore;

	const components: Record<string, any> = { bar: FileBar, line: FileLine, pie: FilePie };

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$FileAgg.isFetching}
		connection={$FileAgg.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => FileAgg.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
