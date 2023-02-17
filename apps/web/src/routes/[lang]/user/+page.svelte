<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Errors } from '@graphace/commons/types';
	import UserConnectionTable from '~/lib/components/objects/user/UserConnectionTable.svelte';
	import type { User, QueryTypeUserConnectionArgs, MutationTypeUserArgs } from '~/lib/types/schema';
	import { Query_userConnectionStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userConnection = data.Query_userConnection as Query_userConnectionStore;
	$: nodes = $Query_userConnection.data?.userConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userConnection.data?.userConnection?.totalCount || 0;
	const Mutation_user = new Mutation_userStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserConnectionArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_userConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userConnection?.edges?.map((edge) => edge?.node));
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
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_user.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.user);
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
		to(`./user/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`./user/${event.detail.path}`);
	};
</script>

<UserConnectionTable
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_userConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
