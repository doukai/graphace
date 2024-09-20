<script lang="ts">
	import { Card } from '@graphace/ui';
	import FileBar from '~/lib/components/objects/file/FileBar.svelte';
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
</script>

<Card>
	<FileBar
		isFetching={$FileAgg.isFetching}
		data={$FileAgg.data}
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
