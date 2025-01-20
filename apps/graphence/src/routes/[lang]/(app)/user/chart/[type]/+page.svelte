<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import UserLine from '~/lib/components/objects/user/UserLine.svelte';
	import UserPie from '~/lib/components/objects/user/UserPie.svelte';
	import type { UserConnection } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.name());

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	const UserConnectionQuery = data.UserConnectionQuery as OperationStore<UserConnection>;

	const components: Record<string, any> = {
		bar: UserBar,
		line: UserLine,
		pie: UserPie
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$UserConnectionQuery.isFetching}
		connection={$UserConnectionQuery.response.data?.userConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) =>
			UserConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'userConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			})}
	/>
</Card>
