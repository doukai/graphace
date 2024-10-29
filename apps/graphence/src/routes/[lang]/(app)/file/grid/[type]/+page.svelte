<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, urlName } from '@graphace/ui';
	import FileGrid from '~/lib/components/objects/file/FileGrid.svelte';
	import FileAggGrid from '~/lib/components/objects/file/FileAggGrid.svelte';
	import type { FileConnectionQueryStore } from '~/lib/stores/file/fileQueryStore';
	import type { FileListMutationStore } from '~/lib/stores/file/fileMutationStore';
	import type { PageData } from './$houdini';
	import { buildGraphQLErrors, validate } from '~/utils';
	import type { FileConnection } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.File.name());
	let connection: FileConnection | null | undefined = {};
	let errors: Record<number, Errors> = {};

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	const FileConnectionQuery = data.FileConnectionQuery as FileConnectionQueryStore;
	const FileListMutation = data.FileListMutation as FileListMutationStore;

	const components: Record<string, any> = {
		mutation: FileGrid,
		agg: FileAggGrid
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$FileConnectionQuery.isFetching}
		{connection}
		{fields}
		{errors}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => {
			errors = {};
			FileConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments).then((response) => {
				connection = response?.data?.fileConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.fileConnection);
				}
			});
		}}
		on:exportQuery={(e) => {
			FileConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments).then((response) => {
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.fileConnection);
				}
			});
		}}
		on:mutation={(e) => {
			validate('Mutation_fileList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					FileListMutation.fetch(
						e.detail.fields,
						e.detail.mutationArguments,
						e.detail.directives
					)
					.then((response) => {
						if (response?.errors) {
							errors = buildGraphQLErrors(response.errors).list.iterms || {};
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.fileList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list.iterms;
				});
		}}
	/>
</Card>
