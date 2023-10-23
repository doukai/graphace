<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import GroupSelectConnectionTable from '~/lib/components/objects/group/GroupSelectConnectionTable.svelte';
	import type { Group, QueryGroupConnectionArgs, MutationGroupArgs } from '~/lib/types/schema';
	import { Query_groupConnectionStore, Mutation_groupStore, Mutation_group_subGroupsStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.fields.subGroups.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_groupConnection = data.Query_groupConnection as Query_groupConnectionStore;
	$: nodes = $Query_groupConnection.data?.groupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_groupConnection.data?.groupConnection?.totalCount || 0;
	const notBelongToParent = data.notBelongToParent;
	const Mutation_group = new Mutation_groupStore();
	const Mutation_group_subGroups = new Mutation_group_subGroupsStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryGroupConnectionArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_groupConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.groupConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validateMutation('Group', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_group.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.group);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const select = (
		event: CustomEvent<{
			selected: MutationGroupArgs | null | undefined | (MutationGroupArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Group', { where: { id: { val: id } }, subGroups: event.detail.selected }, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_group_subGroups.mutate({
						group_id: id,
						group_subGroups: event.detail.selected,
						mergeToList: ['subGroups']
					})
						.then((result) => {
							event.detail.then();
							if (result.errors) {
								event.detail.catch(result.errors);
							}
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.subGroups.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	<GroupSelectConnectionTable
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		args={ { ...notBelongToParent } }
		isFetching={$Query_groupConnection.fetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
