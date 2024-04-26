<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import UserSelectConnectionTable from '~/lib/components/objects/user/UserSelectConnectionTable.svelte';
	import type { UserInput, QueryUserConnectionArgs, MutationUserArgs } from '~/lib/types/schema';
	import { Query_userConnectionStore, Mutation_userStore, Mutation_role_usersStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.users.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_userConnection = data.Query_userConnection as Query_userConnectionStore;
	$: nodes = $Query_userConnection.data?.userConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userConnection.data?.userConnection?.totalCount || 0;
	const notBelongToParent = data.notBelongToParent;
	const Mutation_user = new Mutation_userStore();
	const Mutation_role_users = new Mutation_role_usersStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryUserConnectionArgs;
			then: (data: (UserInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_userConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
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
				Mutation_user.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.user);
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
			selected: MutationUserArgs | null | undefined | (MutationUserArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', { where: { id: { val: id } }, users: event.detail.selected }, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_users.mutate({
						role_id: id,
						role_users: event.detail.selected
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
				errors = validErrors.users.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	<UserSelectConnectionTable
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		args={{ exs: [notBelongToParent] }}
		isFetching={$Query_userConnection.fetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
