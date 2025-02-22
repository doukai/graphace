<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema  } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RealmQuery from '~/lib/components/objects/realm/Realm.svelte';
	import RealmAgg from '~/lib/components/objects/realm/RealmAgg.svelte';
	import RealmGrid from '~/lib/components/objects/realm/RealmGrid.svelte';
	import RealmAggGrid from '~/lib/components/objects/realm/RealmAggGrid.svelte';
	import type { Realm, RealmConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { buildGraphQLErrors } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: urlName($page.url, $LL.graphql.objects.Realm.name());
	let connection: RealmConnection | null | undefined = {};
	let errors: Record<number, Errors> = {};

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	$: realmConnectionQuery = data.realmConnectionQuery as OperationStore<RealmConnection>;
	$: connection = $realmConnectionQuery.response?.data?.realmConnection || {};
	$: totalCount = connection?.totalCount || 0;
	const realmListMutation = data.realmListMutation as OperationStore<Realm[]>;

	const components: Record<string, any> = {
		mutation: RealmGrid,
		agg: RealmAggGrid
	};

	const wrappers: Record<string, any> = {
		mutation: RealmQuery,
		agg: RealmAgg
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
		isFetching={$realmConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) => {
			errors = {};
			realmConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'realmConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
				connection = response?.data?.realmConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.realmConnection);
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
				realmConnectionQuery.fetch({
					fields: [
						createConnectionField({
							name: 'realmConnection',
							fields: e.detail.fields,
							arguments: e.detail.queryArguments,
							directives: e.detail.directives
						})
					]
				}).then((response) => {
					if (e.detail.catch && response?.errors) {
						e.detail.catch(response.errors);
					} else if (e.detail.then) {
						e.detail.then(response?.data?.realmConnection);
					}
				});
			}}
			on:mutation={(e) => {
				validate('Mutation_realmList_Arguments', e.detail.mutationArguments, $locale)
					.then((data) => {
						errors = {};
						realmListMutation.fetch({
							fields: [
								new Field({
									name: 'realmList',
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
								e.detail.then(response?.data?.realmList);
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
