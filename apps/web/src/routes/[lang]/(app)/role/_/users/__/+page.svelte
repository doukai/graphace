<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import UserSelectConnectionTable from '~/lib/components/objects/user/UserSelectConnectionTable.svelte';
	import type { User, QueryUserConnectionArgs, MutationUserArgs } from '~/lib/types/schema';
	import { Query_userConnectionStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.users.name(), PageType.SELECT);
	$: originalNodes = data.nodes as (MutationUserArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: Query_userConnection = data.Query_userConnection as Query_userConnectionStore;
	$: nodes = $Query_userConnection.data?.userConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userConnection.data?.userConnection?.totalCount || 0;
	const Mutation_user = new Mutation_userStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryUserConnectionArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
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
			then: (data: User | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validateMutation('User', event.detail.args, $locale)
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
		if (Array.isArray(event.detail.selected)) {
			ot({
				node: updateNodeParam($page.url, [...originalNodes, ...event.detail.selected.filter((item) => !originalNodes.map((node) => node?.id).includes(item?.id))]),
				errors: updateErrorsParam($page.url, errors)
			});
		}
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};
</script>

<Card>
	<UserSelectConnectionTable
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$Query_userConnection.fetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
