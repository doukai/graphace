<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Error } from '@graphace/commons/types';
	import UserTest1ConnectionTable from '~/lib/components/objects/user-test1/UserTest1ConnectionTable.svelte';
	import type { UserTest1, QueryTypeUserTest1ConnectionArgs, MutationTypeUserTest1Args } from '~/lib/types/schema';
	import { Query_userTest1ConnectionStore, Mutation_userTest1Store } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userTest1Connection = data.Query_userTest1Connection as Query_userTest1ConnectionStore;
	$: nodes = $Query_userTest1Connection.data?.userTest1Connection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userTest1Connection.data?.userTest1Connection?.totalCount || 0;
	const Mutation_userTest1 = new Mutation_userTest1Store();
	let errors: Record<number, Error> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserTest1ConnectionArgs;
			then: (data: (UserTest1 | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userTest1Connection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userTest1Connection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest1Args;
			update?: boolean;
			then: (data: UserTest1 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('UserTest1', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_userTest1.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userTest1);
					})
					.catch((error) => {
						event.detail.catch(error);
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
		to(`./user-test1/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user-test1/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./user-test1/${event.detail.path}`);
	};
</script>
<UserTest1ConnectionTable
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_userTest1Connection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
