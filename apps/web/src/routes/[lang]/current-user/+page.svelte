<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Errors } from '@graphace/commons/types';
	import CurrentUserTable from '~/lib/components/objects/current-user/CurrentUserTable.svelte';
	import type { CurrentUser, QueryTypeCurrentUserListArgs, MutationTypeCurrentUserArgs } from '~/lib/types/schema';
	import { Query_currentUserListStore, Mutation_currentUserStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_currentUserList = data.Query_currentUserList as Query_currentUserListStore;
	$: nodes = $Query_currentUserList.data?.currentUserList;
	const Mutation_currentUser = new Mutation_currentUserStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeCurrentUserListArgs;
			then: (data: (CurrentUser | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_currentUserList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.currentUserList);
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeCurrentUserArgs;
			update?: boolean;
			then: (data: CurrentUser | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.)?.indexOf(event.detail.args.);
		validate('CurrentUser', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_currentUser.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.currentUser);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				if (row) {
					errors[row].iterms = validErrors;
				}
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./current-user/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./current-user/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./current-user/${event.detail.path}`);
	};
</script>
	{nodes}
	{errors}
	isFetching={$Query_currentUserList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
