<script lang="ts">
	import { ot, to, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import GroupRoleSelectConnectionTable from '~/lib/components/objects/group-role/GroupRoleSelectConnectionTable.svelte';
	import type { GroupRole, QueryTypeGroupRoleConnectionArgs, MutationTypeGroupRoleArgs } from '~/lib/types/schema';
	import { Query_groupRoleConnectionStore, Mutation_groupRoleStore, Mutation_group_groupRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.web.path.select());
	$: id = data.id as string;
	$: Query_groupRoleConnection = data.Query_groupRoleConnection as Query_groupRoleConnectionStore;
	$: nodes = $Query_groupRoleConnection.data?.groupRoleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_groupRoleConnection.data?.groupRoleConnection?.totalCount || 0;
	const Mutation_groupRole = new Mutation_groupRoleStore();
	const Mutation_group_groupRole = new Mutation_group_groupRoleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeGroupRoleConnectionArgs;
			then: (data: (GroupRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_groupRoleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.groupRoleConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('GroupRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_groupRole.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.groupRole);
					})
					.catch((errors) => {
						event.detail.catch(errors);
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
			selected: MutationTypeGroupRoleArgs | null | undefined | (MutationTypeGroupRoleArgs | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Group', { groupRole: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_group_groupRole.mutate({
						group_id: id,
						group_groupRole: event.detail.selected,
						update: true,
						mergeToList: ['groupRole']
					})
						.then((result) => {
							event.detail.then();
						})
						.catch((errors) => {
							event.detail.catch(errors);
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.groupRole.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<GroupRoleSelectConnectionTable
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_groupRoleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
