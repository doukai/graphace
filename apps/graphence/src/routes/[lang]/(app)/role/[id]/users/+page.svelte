<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import UserConnectionTable from '~/lib/components/objects/user/UserConnectionTable.svelte';
	import type { Query_role_users_Store } from '~/lib/stores/query/query_role_users_store';
	import type { Mutation_role_users_Store } from '~/lib/stores/mutation/mutation_role_users_store';
	import type { Mutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import type { UserInput, MutationUserArgs, QueryUserConnectionArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.users.name());
	$: id = data.id as string;
	$: query_role_users_Store = data.query_role_users_Store as Query_role_users_Store;
	$: role = $query_role_users_Store.response.data?.role;
	$: nodes = $query_role_users_Store.response.data?.role?.usersConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_users_Store.response.data?.role?.usersConnection?.totalCount || 0;
	$: mutation_role_users_Store = data.mutation_role_users_Store as Mutation_role_users_Store;
	$: mutation_user_Store = data.mutation_user_Store as Mutation_user_Store;
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryUserConnectionArgs;
			then: (data: (UserInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_role_users_Store.fetch({ role_id: { val: role?.id }, ...event.detail.args })
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.role?.usersConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationUserArgs;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validate('Mutation_user_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_user_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.user);
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
			args: MutationUserArgs[];
			then: (data: UserInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id }}, users: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_role_users_Store.fetch({
					role_id: id,
					role_users: event.detail.args
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

<Card>
	<UserConnectionTable
		showSaveButton={false}
		showRemoveButton={false}
		showUnbindButton={true}
		showGotoSelectButton={true}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$query_role_users_Store.isFetching}
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
