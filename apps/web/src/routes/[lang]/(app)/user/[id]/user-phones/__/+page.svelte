<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import UserPhonesSelectConnectionTable from '~/lib/components/objects/user-phones/UserPhonesSelectConnectionTable.svelte';
	import type { UserPhones, QueryTypeUserPhonesConnectionArgs, MutationTypeUserPhonesArgs } from '~/lib/types/schema';
	import { Query_userPhonesConnectionStore, Mutation_userPhonesStore, Mutation_user_userPhonesStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.fields.userPhones.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_userPhonesConnection = data.Query_userPhonesConnection as Query_userPhonesConnectionStore;
	$: nodes = $Query_userPhonesConnection.data?.userPhonesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userPhonesConnection.data?.userPhonesConnection?.totalCount || 0;
	const Mutation_userPhones = new Mutation_userPhonesStore();
	const Mutation_user_userPhones = new Mutation_user_userPhonesStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserPhonesConnectionArgs;
			then: (data: (UserPhones | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_userPhonesConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userPhonesConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs;
			update?: boolean;
			then: (data: UserPhones | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validateMutation('UserPhones', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_userPhones.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.userPhones);
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
			selected: MutationTypeUserPhonesArgs | null | undefined | (MutationTypeUserPhonesArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('User', { userPhones: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_user_userPhones.mutate({
						user_id: id,
						user_userPhones: event.detail.selected,
						update: true,
						mergeToList: ['userPhones']
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
				errors = validErrors.userPhones.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<UserPhonesSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_userPhonesConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
