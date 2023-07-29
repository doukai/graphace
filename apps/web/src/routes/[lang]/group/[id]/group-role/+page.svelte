<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupRoleConnectionTable from '~/lib/components/objects/group-role/GroupRoleConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeGroupRoleArgs, QueryTypeGroupRoleConnectionArgs, GroupRole } from '~/lib/types/schema';
	import { Query_group_groupRoleStore, Mutation_groupRoleStore, Mutation_group_groupRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	urlName($page.url, 'groupRole');
	$: id = data.id as string;
	$: Query_group_groupRole = data.Query_group_groupRole as Query_group_groupRoleStore;
	$: group = $Query_group_groupRole.data?.group;
	$: nodes = $Query_group_groupRole.data?.group?.groupRoleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_group_groupRole.data?.group?.groupRoleConnection?.totalCount || 0;
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
		Query_group_groupRole.fetch({
			variables: { group_id: { val: group?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.group?.groupRoleConnection?.edges?.map((edge) => edge?.node));
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs[];
			update?: boolean;
			then: (data: GroupRole[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Group', { groupRole: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_group_groupRole.mutate({
					group_id: id,
					group_groupRole: event.detail.args,
					update: true,
					mergeToList: ['groupRole']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.groupRole.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../group-role/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./group-role/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../group-role/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./group-role/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<GroupRoleConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_group_groupRole.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
