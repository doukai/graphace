<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import GroupGrid from '~/lib/components/objects/group/GroupGrid.svelte';
	import GroupAggGrid from '~/lib/components/objects/group/GroupAggGrid.svelte';
	import type { Group, GroupConnection } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { buildGraphQLErrors, validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.name());
	let connection: GroupConnection | null | undefined = {};
	let errors: Record<number, Errors> = {};

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	const GroupConnectionQuery = data.GroupConnectionQuery as OperationStore<GroupConnection>;
	const GroupListMutation = data.GroupListMutation as OperationStore<Group[]>;

	const components: Record<string, any> = {
		mutation: GroupGrid,
		agg: GroupAggGrid
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$GroupConnectionQuery.isFetching}
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
			GroupConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'groupConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
				connection = response?.data?.groupConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.groupConnection);
				}
			});
		}}
		on:exportQuery={(e) => {
			GroupConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'groupConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.groupConnection);
				}
			});
		}}
		on:mutation={(e) => {
			validate('Mutation_groupList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					GroupListMutation.fetch({
						fields: [
							new Field({
								name: 'groupList',
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
							e.detail.then(response?.data?.groupList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list?.iterms;
				});
		}}
	/>
</Card>
