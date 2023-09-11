<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserPhonesConnectionTable from '~/lib/components/objects/user-phones/UserPhonesConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationTypeUserPhonesArgs, QueryTypeUserPhonesConnectionArgs, UserPhones } from '~/lib/types/schema';
	import { Query_user_userPhonesStore, Mutation_userPhonesStore, Mutation_user_userPhonesStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.fields.userPhones.name());
	$: id = data.id as string;
	$: Query_user_userPhones = data.Query_user_userPhones as Query_user_userPhonesStore;
	$: user = $Query_user_userPhones.data?.user;
	$: nodes = $Query_user_userPhones.data?.user?.userPhonesConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_user_userPhones.data?.user?.userPhonesConnection?.totalCount || 0;
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
		Query_user_userPhones.fetch({
			variables: { user_id: { val: user?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.user?.userPhonesConnection?.edges?.map((edge) => edge?.node));
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs[];
			update?: boolean;
			then: (data: UserPhones[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('User', { id: id, userPhones: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_userPhones.mutate({
					user_id: id,
					user_userPhones: event.detail.args,
					update: true,
					mergeToList: ['userPhones']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.userPhones.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../user-phones/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user-phones/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../user-phones/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./user-phones/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<UserPhonesConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_user_userPhones.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
