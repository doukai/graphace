<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserGroupConnectionTable from '~/lib/components/objects/user-group/UserGroupConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserGroupArgs, QueryTypeUserGroupConnectionArgs, UserGroup } from '~/lib/types/schema';
	import { Query_group_userGroupStore, Mutation_userGroupStore, Mutation_group_userGroupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, 'userGroup');
	$: id = data.id as string;
	$: Query_group_userGroup = data.Query_group_userGroup as Query_group_userGroupStore;
	$: group = $Query_group_userGroup.data?.group;
	$: nodes = $Query_group_userGroup.data?.group?.userGroupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_group_userGroup.data?.group?.userGroupConnection?.totalCount || 0;
	const Mutation_userGroup = new Mutation_userGroupStore();
	const Mutation_group_userGroup = new Mutation_group_userGroupStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserGroupConnectionArgs;
			then: (data: (UserGroup | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_group_userGroup.fetch({
			variables: { group_id: { val: group?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.group?.userGroupConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserGroupArgs;
			update?: boolean;
			then: (data: UserGroup | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('UserGroup', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_userGroup.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.userGroup);
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
			args: MutationTypeUserGroupArgs[];
			update?: boolean;
			then: (data: UserGroup[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Group', { userGroup: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_group_userGroup.mutate({
					group_id: id,
					group_userGroup: event.detail.args,
					update: true,
					mergeToList: ['userGroup']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.userGroup.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../user-group/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user-group/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../user-group/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./user-group/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<UserGroupConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_group_userGroup.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
