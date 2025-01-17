<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, urlName } from '@graphace/ui';
	import PermissionGrid from '~/lib/components/objects/permission/PermissionGrid.svelte';
	import PermissionAggGrid from '~/lib/components/objects/permission/PermissionAggGrid.svelte';
	import type { PermissionConnectionQueryStore } from '~/lib/stores/permission/permissionQueryStore';
	import type { PermissionListMutationStore } from '~/lib/stores/permission/permissionMutationStore';
	import type { PermissionConnection } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { buildGraphQLErrors, validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.name());
	let connection: PermissionConnection | null | undefined = {};
	let errors: Record<number, Errors> = {};

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	const PermissionConnectionQuery = data.PermissionConnectionQuery as PermissionConnectionQueryStore;
	const PermissionListMutation = data.PermissionListMutation as PermissionListMutationStore;

	const components: Record<string, any> = {
		mutation: PermissionGrid,
		agg: PermissionAggGrid
	};

	$: component = components[data.type];
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
					PermissionListMutation.fetch(
						e.detail.fields,
						e.detail.mutationArguments,
						e.detail.directives
					)
					.then((response) => {
						if (response?.errors) {
							errors = buildGraphQLErrors(response.errors).list?.iterms || {};
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.permissionList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list?.iterms;
				});
		}}
	/>
</Card>
