<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserGroupConnectionTable from '~/lib/components/objects/user-group/UserGroupConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserGroupArgs, QueryTypeUserGroupConnectionArgs, UserGroup } from '~/lib/types/schema';
	import { Query_user_userGroupStore, Mutation_userGroupStore, Mutation_user_userGroupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.fields.userGroup.name());
	$: id = data.id as string;
	$: Query_user_userGroup = data.Query_user_userGroup as Query_user_userGroupStore;
	$: user = $Query_user_userGroup.data?.user;
	$: nodes = $Query_user_userGroup.data?.user?.userGroupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_user_userGroup.data?.user?.userGroupConnection?.totalCount || 0;
	const Mutation_userGroup = new Mutation_userGroupStore();
	const Mutation_user_userGroup = new Mutation_user_userGroupStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserGroupConnectionArgs;
			then: (data: (UserGroup | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_user_userGroup.fetch({
			variables: { user_id: { val: user?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.user?.userGroupConnection?.edges?.map((edge) => edge?.node));
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
		validate('User', { userGroup: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_userGroup.mutate({
					user_id: id,
					user_userGroup: event.detail.args,
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
	isFetching={$Query_user_userGroup.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
