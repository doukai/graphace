<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import UserGrid from '~/lib/components/objects/user/UserGrid.svelte';
	import UserAggGrid from '~/lib/components/objects/user/UserAggGrid.svelte';
	import type { User, UserConnection } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { buildGraphQLErrors, validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
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

	const UserConnectionQuery = data.UserConnectionQuery as OperationStore<UserConnection>;
	const UserListMutation = data.UserListMutation as OperationStore<User[]>;

	const components: Record<string, any> = {
		mutation: UserGrid,
		agg: UserAggGrid
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$UserConnectionQuery.isFetching}
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
			UserConnectionQuery.fetch({
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
		on:exportQuery={(e) => {
			UserConnectionQuery.fetch({
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
					UserListMutation.fetch({
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
</Card>
