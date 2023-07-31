<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import UserGroupSelectConnectionTable from '~/lib/components/objects/user-group/UserGroupSelectConnectionTable.svelte';
	import type { UserGroup, QueryTypeUserGroupConnectionArgs, MutationTypeUserGroupArgs } from '~/lib/types/schema';
	import { Query_userGroupConnectionStore, Mutation_userGroupStore, Mutation_group_userGroupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, 'userGroup', PageType.SELECT);
	$: id = data.id as string;
	$: Query_userGroupConnection = data.Query_userGroupConnection as Query_userGroupConnectionStore;
	$: nodes = $Query_userGroupConnection.data?.userGroupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userGroupConnection.data?.userGroupConnection?.totalCount || 0;
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
		Query_userGroupConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userGroupConnection?.edges?.map((edge) => edge?.node));
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

	const select = (
		event: CustomEvent<{
			selected: MutationTypeUserGroupArgs | null | undefined | (MutationTypeUserGroupArgs | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Group', { userGroup: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_group_userGroup.mutate({
						group_id: id,
						group_userGroup: event.detail.selected,
						update: true,
						mergeToList: ['userGroup']
					})
						.then((result) => {
							event.detail.then();
						})
						.catch((errors) => {
							event.detail.catch(errors);
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.userGroup.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<UserGroupSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_userGroupConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
