<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Card } from '@graphace/ui';
	import PermissionGrid from '~/lib/components/objects/permission/PermissionGrid.svelte';
	import PermissionAggGrid from '~/lib/components/objects/permission/PermissionAggGrid.svelte';
	import type { PermissionConnectionQueryStore } from '~/lib/stores/permission/permissionQueryStore';
	import type { PermissionListMutationStore } from '~/lib/stores/permission/permissionMutationStore';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	let errors: Record<number, Errors> = {};

	const {
		fields,
		queryArguments,
		showHeader,
		showFooter,
		showOptionButton,
		showFilterButton,
		showBookmarkButton
	} = data;

	const PermissionConnectionQuery = data.PermissionQuery as PermissionConnectionQueryStore;
	const PermissionListMutation = data.PermissionQuery as PermissionListMutationStore;

	const components: Record<string, any> = {
		mutation: PermissionGrid,
		agg: PermissionAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$PermissionConnectionQuery.isFetching}
		connection={$PermissionConnectionQuery.response.data?.permissionConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => {
			errors = {};
			PermissionConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments);
		}}
		on:mutation={(e) => {
			validate('Mutation_permissionList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					PermissionListMutation.fetch(e.detail.fields, e.detail.mutationArguments).then((response) => {
						if (response?.errors) {
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.permissionList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list.iterms;
				});
		}}
	/>
</Card>
