<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Error } from '@graphace/commons/types';
	import UserTest2ConnectionTable from '~/lib/components/objects/user-test2/UserTest2ConnectionTable.svelte';
	import type { UserTest2, QueryTypeUserTest2ConnectionArgs, MutationTypeUserTest2Args } from '~/lib/types/schema';
	import { Query_userTest2ConnectionStore, Mutation_userTest2Store } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userTest2Connection = data.Query_userTest2Connection as Query_userTest2ConnectionStore;
	$: nodes = $Query_userTest2Connection.data?.userTest2Connection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userTest2Connection.data?.userTest2Connection?.totalCount || 0;
	const Mutation_userTest2 = new Mutation_userTest2Store();
	let errors: Record<number, Error> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserTest2ConnectionArgs;
			then: (data: (UserTest2 | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userTest2Connection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userTest2Connection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			update?: boolean;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('UserTest2', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_userTest2.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userTest2);
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
		to(`./user-test2/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user-test2/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./user-test2/${event.detail.path}`);
	};
</script>
<UserTest2ConnectionTable
	bind:nodes
	{totalCount}
	{errors}
	isFetching={$Query_userTest2Connection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
