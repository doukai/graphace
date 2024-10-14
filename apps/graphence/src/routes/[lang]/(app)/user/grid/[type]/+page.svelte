<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Card } from '@graphace/ui';
	import UserGrid from '~/lib/components/objects/user/UserGrid.svelte';
	import UserAggGrid from '~/lib/components/objects/user/UserAggGrid.svelte';
	import type { UserConnectionQueryStore } from '~/lib/stores/user/userQueryStore';
	import type { UserListMutationStore } from '~/lib/stores/user/userMutationStore';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	let errors: Record<number, Errors> = {};

	const {
		fields,
		queryArguments,
		showHeader,
		showFooter,
		showOptionButton,
		showFilterButton,
		showBookmarkButton
	} = data;

	const UserConnectionQuery = data.UserQuery as UserConnectionQueryStore;
	const UserListMutation = data.UserQuery as UserListMutationStore;

	const components: Record<string, any> = {
		mutation: UserGrid,
		agg: UserAggGrid
	};

	const component = components[data.type];
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
		on:query={(e) => {
			errors = {};
			UserConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments);
		}}
		on:mutation={(e) => {
			validate('Mutation_userList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					UserListMutation.fetch(e.detail.fields, e.detail.mutationArguments).then((response) => {
						if (response?.errors) {
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.userList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list.iterms;
				});
		}}
	/>
</Card>
