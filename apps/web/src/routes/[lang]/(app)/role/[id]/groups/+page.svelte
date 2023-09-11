<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupConnectionTable from '~/lib/components/objects/group/GroupConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationTypeGroupArgs, QueryTypeGroupConnectionArgs, Group } from '~/lib/types/schema';
	import { Query_role_groupsStore, Mutation_groupStore, Mutation_role_groupsStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.groups.name());
	$: id = data.id as string;
	$: Query_role_groups = data.Query_role_groups as Query_role_groupsStore;
	$: role = $Query_role_groups.data?.role;
	$: nodes = $Query_role_groups.data?.role?.groupsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_role_groups.data?.role?.groupsConnection?.totalCount || 0;
	const Mutation_group = new Mutation_groupStore();
	const Mutation_role_groups = new Mutation_role_groupsStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeGroupConnectionArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_role_groups.fetch({
			variables: { role_id: { val: role?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.role?.groupsConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validateMutation('Group', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_group.mutate({ ...event.detail.args, update: event.detail.update })
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs[];
			update?: boolean;
			then: (data: Group[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Role', { id: id, groups: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_groups.mutate({
					role_id: id,
					role_groups: event.detail.args,
					update: true,
					mergeToList: ['groups']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.groups.iterms;
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
		to(`./groups/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../group/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./groups/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<GroupConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_role_groups.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
