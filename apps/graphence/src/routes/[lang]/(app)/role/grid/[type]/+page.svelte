<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema  } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RoleQuery from '~/lib/components/objects/role/Role.svelte';
	import RoleAgg from '~/lib/components/objects/role/RoleAgg.svelte';
	import RoleGrid from '~/lib/components/objects/role/RoleGrid.svelte';
	import RoleAggGrid from '~/lib/components/objects/role/RoleAggGrid.svelte';
	import type { Role, RoleConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { buildGraphQLErrors } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

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

	$: roleConnectionQuery = data.roleConnectionQuery as OperationStore<RoleConnection>;
	$: connection = $roleConnectionQuery.response?.data?.roleConnection || {};
	$: totalCount = connection?.totalCount || 0;
	const roleListMutation = data.roleListMutation as OperationStore<Role[]>;

	const components: Record<string, any> = {
		mutation: RoleGrid,
		agg: RoleAggGrid
	};

	const wrappers: Record<string, any> = {
		mutation: RoleQuery,
		agg: RoleAgg
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
		isFetching={$roleConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) => {
			errors = {};
			roleConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'roleConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
				connection = response?.data?.roleConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.roleConnection);
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
				roleConnectionQuery.fetch({
					fields: [
						createConnectionField({
							name: 'roleConnection',
							fields: e.detail.fields,
							arguments: e.detail.queryArguments,
							directives: e.detail.directives
						})
					]
				}).then((response) => {
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
						roleListMutation.fetch({
							fields: [
								new Field({
									name: 'roleList',
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
								e.detail.then(response?.data?.roleList);
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
