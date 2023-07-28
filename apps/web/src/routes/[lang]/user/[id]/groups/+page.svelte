<script lang="ts">
	import { ot, to, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupConnectionTable from '~/lib/components/objects/group/GroupConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeGroupArgs, QueryTypeGroupConnectionArgs, Group } from '~/lib/types/schema';
	import { Query_user_groupsStore, Mutation_groupStore, Mutation_user_groupsStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	urlName($page.url, 'groups');
	$: id = data.id as string;
	$: Query_user_groups = data.Query_user_groups as Query_user_groupsStore;
	$: user = $Query_user_groups.data?.user;
	$: nodes = $Query_user_groups.data?.user?.groupsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_user_groups.data?.user?.groupsConnection?.totalCount || 0;
	const Mutation_group = new Mutation_groupStore();
	const Mutation_user_groups = new Mutation_user_groupsStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeGroupConnectionArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_user_groups.fetch({
			variables: { user_id: { val: user?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.user?.groupsConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Group', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_group.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.group);
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
			args: MutationTypeGroupArgs[];
			update?: boolean;
			then: (data: Group[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('User', { groups: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_groups.mutate({
					user_id: id,
					user_groups: event.detail.args,
					update: true,
					mergeToList: ['groups']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.roles.iterms;
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
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_user_groups.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
