<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, urlName } from '@graphace/ui';
	import RoleGrid from '~/lib/components/objects/role/RoleGrid.svelte';
	import RoleAggGrid from '~/lib/components/objects/role/RoleAggGrid.svelte';
	import type { RoleConnectionQueryStore } from '~/lib/stores/role/roleQueryStore';
	import type { RoleListMutationStore } from '~/lib/stores/role/roleMutationStore';
	import type { RoleConnection } from '~/';
	import type { PageData } from './$houdini';
	import { buildGraphQLErrors, validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.name());
	let connection: RoleConnection | null | undefined = {};
	let errors: Record<number, Errors> = {};

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	const RoleConnectionQuery = data.RoleConnectionQuery as RoleConnectionQueryStore;
	const RoleListMutation = data.RoleListMutation as RoleListMutationStore;

	const components: Record<string, any> = {
		mutation: RoleGrid,
		agg: RoleAggGrid
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RoleConnectionQuery.isFetching}
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
			RoleConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments).then((response) => {
				connection = response?.data?.roleConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.roleConnection);
				}
			});
		}}
		on:exportQuery={(e) => {
			RoleConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments).then((response) => {
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.roleConnection);
				}
			});
		}}
		on:mutation={(e) => {
			validate('Mutation_roleList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					RoleListMutation.fetch(
						e.detail.fields,
						e.detail.mutationArguments,
						e.detail.directives
					)
					.then((response) => {
						if (response?.errors) {
							errors = buildGraphQLErrors(response.errors).list.iterms || {};
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.roleList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list.iterms;
				});
		}}
	/>
</Card>
