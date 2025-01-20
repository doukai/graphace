<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RealmBar from '~/lib/components/objects/realm/RealmBar.svelte';
	import RealmLine from '~/lib/components/objects/realm/RealmLine.svelte';
	import RealmPie from '~/lib/components/objects/realm/RealmPie.svelte';
	import type { RealmConnection } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Realm.name());

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	const RealmConnectionQuery = data.RealmConnectionQuery as OperationStore<RealmConnection>;

	const components: Record<string, any> = {
		bar: RealmBar,
		line: RealmLine,
		pie: RealmPie
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RealmConnectionQuery.isFetching}
		connection={$RealmConnectionQuery.response.data?.realmConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) =>
			RealmConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'realmConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			})}
	/>
</Card>
