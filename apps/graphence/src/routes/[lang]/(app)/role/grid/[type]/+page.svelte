<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RoleGrid from '~/lib/components/objects/role/RoleGrid.svelte';
	import RoleAggGrid from '~/lib/components/objects/role/RoleAggGrid.svelte';
	import type { Role, RoleConnection } from '~/lib/types/schema';
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

	const RoleConnectionQuery = data.RoleConnectionQuery as OperationStore<RoleConnection>;
	const RoleListMutation = data.RoleListMutation as OperationStore<Role[]>;

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
			RoleConnectionQuery.fetch({
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
		on:exportQuery={(e) => {
			RoleConnectionQuery.fetch({
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
					RoleListMutation.fetch({
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
</Card>
