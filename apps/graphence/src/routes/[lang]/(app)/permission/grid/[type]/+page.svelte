<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema  } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import PermissionGrid from '~/lib/components/objects/permission/PermissionGrid.svelte';
	import PermissionAggGrid from '~/lib/components/objects/permission/PermissionAggGrid.svelte';
	import type { Permission, PermissionConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { buildGraphQLErrors } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

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

	const PermissionConnectionQuery = data.PermissionConnectionQuery as OperationStore<PermissionConnection>;
	const PermissionListMutation = data.PermissionListMutation as OperationStore<Permission[]>;

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
			PermissionConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'permissionConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
				connection = response?.data?.permissionConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.permissionConnection);
				}
			});
		}}
		on:exportQuery={(e) => {
			PermissionConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'permissionConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
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
					PermissionListMutation.fetch({
						fields: [
							new Field({
								name: 'permissionList',
								fields: e.detail.fields,
								arguments: e.detail.mutationArguments,
								directives: e.detail.directives
							})
						]
					}).then((response) => {
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
