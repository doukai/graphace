<script lang="ts">
	import { Card } from '@graphace/ui';
	import FileBar from '~/lib/components/objects/file/FileBar.svelte';
	import FileLine from '~/lib/components/objects/file/FileLine.svelte';
	import FilePie from '~/lib/components/objects/file/FilePie.svelte';
	import FileAggTable from '~/lib/components/objects/file/FileAggTable.svelte';
	import type { FileQueryStore } from '~/lib/stores/file/fileQueryStore';
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

	const FileQuery = data.FileQuery as FileQueryStore;

	const components: Record<string, any> = {
		bar: FileBar,
		line: FileLine,
		pie: FilePie,
		table: FileAggTable
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$FileQuery.isFetching}
		connection={$FileQuery.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => FileQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
