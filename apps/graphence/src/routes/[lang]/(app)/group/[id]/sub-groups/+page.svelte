<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import GroupConnectionTable from '~/lib/components/objects/group/GroupConnectionTable.svelte';
	import type { Query_group_subGroups_Store } from '~/lib/stores/query/query_group_subGroups_store';
	import type { Mutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import type { GroupInput, MutationGroupArgs, QueryGroupConnectionArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.fields.subGroups.name());
	$: id = data.id as string;
	$: query_group_subGroups_Store = data.query_group_subGroups_Store as Query_group_subGroups_Store;
	$: group = $query_group_subGroups_Store.response.data?.group;
	$: nodes = $query_group_subGroups_Store.response.data?.group?.subGroupsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_group_subGroups_Store.response.data?.group?.subGroupsConnection?.totalCount || 0;
	$: mutation_group_subGroups_Store = data.mutation_group_subGroups_Store as Mutation_group_subGroups_Store;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryGroupConnectionArgs;
			then: (data: (GroupInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_group_subGroups_Store.fetch({ group_id: { val: group?.id }, ...event.detail.args })
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.group?.subGroupsConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validate('Mutation_group_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_group_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.group);
						}
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const parentMutation = (
		event: CustomEvent<{
			args: MutationGroupArgs[];
			then: (data: GroupInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_group_Arguments', { where: { id: { val: id }}, subGroups: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_group_subGroups_Store.fetch({
					group_id: id,
					group_subGroups: event.detail.args
				})
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(undefined);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.subGroups.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../group/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./sub-groups/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../group/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./sub-groups/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>

<Card>
	<GroupConnectionTable
		showSaveButton={false}
		showRemoveButton={false}
		showUnbindButton={true}
		showGotoSelectButton={true}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$query_group_subGroups_Store.isFetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:parentMutation={parentMutation}
		on:edit={edit}
		on:create={create}
		on:gotoField={gotoField}
		on:gotoSelect={gotoSelect}
		on:back={back}
	/>
</Card>
