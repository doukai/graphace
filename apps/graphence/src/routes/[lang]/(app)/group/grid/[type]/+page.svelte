<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema  } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import GroupQuery from '~/lib/components/objects/group/Group.svelte';
	import GroupAgg from '~/lib/components/objects/group/GroupAgg.svelte';
	import GroupGrid from '~/lib/components/objects/group/GroupGrid.svelte';
	import GroupAggGrid from '~/lib/components/objects/group/GroupAggGrid.svelte';
	import type { Group, GroupConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { buildGraphQLErrors } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

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

	$: groupConnectionQuery = data.groupConnectionQuery as OperationStore<GroupConnection>;
	$: connection = $groupConnectionQuery.response?.data?.groupConnection || {};
	$: totalCount = connection?.totalCount || 0;
	const groupListMutation = data.groupListMutation as OperationStore<Group[]>;

	const components: Record<string, any> = {
		mutation: GroupGrid,
		agg: GroupAggGrid
	};

	const wrappers: Record<string, any> = {
		mutation: GroupQuery,
		agg: GroupAgg
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
		isFetching={$groupConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) => {
			errors = {};
			groupConnectionQuery.fetch({
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
				groupConnectionQuery.fetch({
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
						groupListMutation.fetch({
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
	</svelte:component>
</Card>
