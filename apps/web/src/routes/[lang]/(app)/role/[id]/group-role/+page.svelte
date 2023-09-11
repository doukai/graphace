<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupRoleConnectionTable from '~/lib/components/objects/group-role/GroupRoleConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationTypeGroupRoleArgs, QueryTypeGroupRoleConnectionArgs, GroupRole } from '~/lib/types/schema';
	import { Query_role_groupRoleStore, Mutation_groupRoleStore, Mutation_role_groupRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.groupRole.name());
	$: id = data.id as string;
	$: Query_role_groupRole = data.Query_role_groupRole as Query_role_groupRoleStore;
	$: role = $Query_role_groupRole.data?.role;
	$: nodes = $Query_role_groupRole.data?.role?.groupRoleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_role_groupRole.data?.role?.groupRoleConnection?.totalCount || 0;
	const Mutation_groupRole = new Mutation_groupRoleStore();
	const Mutation_role_groupRole = new Mutation_role_groupRoleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeGroupRoleConnectionArgs;
			then: (data: (GroupRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_role_groupRole.fetch({
			variables: { role_id: { val: role?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.role?.groupRoleConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validateMutation('GroupRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_groupRole.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.groupRole);
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs[];
			update?: boolean;
			then: (data: GroupRole[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Role', { id: id, groupRole: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_groupRole.mutate({
					role_id: id,
					role_groupRole: event.detail.args,
					update: true,
					mergeToList: ['groupRole']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
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
	isFetching={$Query_role_groupRole.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
