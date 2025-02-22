<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema  } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import PermissionQuery from '~/lib/components/objects/permission/Permission.svelte';
	import PermissionAgg from '~/lib/components/objects/permission/PermissionAgg.svelte';
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

	$: permissionConnectionQuery = data.permissionConnectionQuery as OperationStore<PermissionConnection>;
	$: connection = $permissionConnectionQuery.response?.data?.permissionConnection || {};
	$: totalCount = connection?.totalCount || 0;
	const permissionListMutation = data.permissionListMutation as OperationStore<Permission[]>;

	const components: Record<string, any> = {
		mutation: PermissionGrid,
		agg: PermissionAggGrid
	};

	const wrappers: Record<string, any> = {
		mutation: PermissionQuery,
		agg: PermissionAgg
	};

	$: component = components[data.type];
	$: wrapper = wrappers[data.type];
</script>

<Card>
	<svelte:component
		this={wrapper}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		isFetching={$permissionConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) => {
			errors = {};
			permissionConnectionQuery.fetch({
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
		let:fields
		let:queryFields
		let:queryArguments
		let:getFieldName
		let:getGrouByName
		let:queryPage
		let:buildArguments
	>
		<svelte:component
			this={component}
			{connection}
			{fields}
			{errors}
			{queryFields}
			{queryArguments}
			{getFieldName}
			{getGrouByName}
			{queryPage}
			{buildArguments}
			on:exportQuery={(e) => {
				permissionConnectionQuery.fetch({
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
						permissionListMutation.fetch({
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
	</svelte:component>
</Card>
