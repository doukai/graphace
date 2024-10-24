<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Card } from '@graphace/ui';
	import PermissionGrid from '~/lib/components/objects/permission/PermissionGrid.svelte';
	import PermissionAggGrid from '~/lib/components/objects/permission/PermissionAggGrid.svelte';
	import type { PermissionConnectionQueryStore } from '~/lib/stores/permission/permissionQueryStore';
	import type { PermissionListMutationStore } from '~/lib/stores/permission/permissionMutationStore';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import type { PermissionConnection } from '~/lib/types/schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	let connection: PermissionConnection | null | undefined = {};
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

	const PermissionConnectionQuery = data.PermissionConnectionQuery as PermissionConnectionQueryStore;
	const PermissionListMutation = data.PermissionListMutation as PermissionListMutationStore;

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
			PermissionConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments).then((response) => {
				connection = response?.data?.permissionConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.permissionConnection);
				}
			});
		}}
		on:exportQuery={(e) => {
			PermissionConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments).then((response) => {
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.permissionConnection);
				}
			});
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
