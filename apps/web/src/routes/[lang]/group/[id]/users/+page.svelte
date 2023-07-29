<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserConnectionTable from '~/lib/components/objects/user/UserConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, QueryTypeUserConnectionArgs, User } from '~/lib/types/schema';
	import { Query_group_usersStore, Mutation_userStore, Mutation_group_usersStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	urlName($page.url, 'users');
	$: id = data.id as string;
	$: Query_group_users = data.Query_group_users as Query_group_usersStore;
	$: group = $Query_group_users.data?.group;
	$: nodes = $Query_group_users.data?.group?.usersConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_group_users.data?.group?.usersConnection?.totalCount || 0;
	const Mutation_user = new Mutation_userStore();
	const Mutation_group_users = new Mutation_group_usersStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserConnectionArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_group_users.fetch({
			variables: { group_id: { val: group?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.group?.usersConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('User', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_user.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.user);
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
			args: MutationTypeUserArgs[];
			update?: boolean;
			then: (data: User[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Group', { users: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_group_users.mutate({
					group_id: id,
					group_users: event.detail.args,
					update: true,
					mergeToList: ['users']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.users.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../user/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./users/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../user/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./users/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<UserConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_group_users.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
