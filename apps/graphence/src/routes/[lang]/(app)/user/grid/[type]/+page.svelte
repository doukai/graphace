<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema  } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import UserQuery from '~/lib/components/objects/user/User.svelte';
	import UserAgg from '~/lib/components/objects/user/UserAgg.svelte';
	import UserGrid from '~/lib/components/objects/user/UserGrid.svelte';
	import UserAggGrid from '~/lib/components/objects/user/UserAggGrid.svelte';
	import type { User, UserConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { buildGraphQLErrors } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: urlName($page.url, $LL.graphql.objects.User.name());
	let connection: UserConnection | null | undefined = {};
	let errors: Record<number, Errors> = {};

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	$: userConnectionQuery = data.userConnectionQuery as OperationStore<UserConnection>;
	$: connection = $userConnectionQuery.response?.data?.userConnection || {};
	$: totalCount = connection?.totalCount || 0;
	const userListMutation = data.userListMutation as OperationStore<User[]>;

	const components: Record<string, any> = {
		mutation: UserGrid,
		agg: UserAggGrid
	};

	const wrappers: Record<string, any> = {
		mutation: UserQuery,
		agg: UserAgg
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
		isFetching={$userConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) => {
			errors = {};
			userConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'userConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
				connection = response?.data?.userConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.userConnection);
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
				userConnectionQuery.fetch({
					fields: [
						createConnectionField({
							name: 'userConnection',
							fields: e.detail.fields,
							arguments: e.detail.queryArguments,
							directives: e.detail.directives
						})
					]
				}).then((response) => {
					if (e.detail.catch && response?.errors) {
						e.detail.catch(response.errors);
					} else if (e.detail.then) {
						e.detail.then(response?.data?.userConnection);
					}
				});
			}}
			on:mutation={(e) => {
				validate('Mutation_userList_Arguments', e.detail.mutationArguments, $locale)
					.then((data) => {
						errors = {};
						userListMutation.fetch({
							fields: [
								new Field({
									name: 'userList',
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
								e.detail.then(response?.data?.userList);
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
