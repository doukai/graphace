<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Error } from '@graphace/commons/types';
	import UserProfileConnectionTable from '~/lib/components/objects/user-profile/UserProfileConnectionTable.svelte';
	import type { UserProfile, QueryTypeUserProfileConnectionArgs, MutationTypeUserProfileArgs } from '~/lib/types/schema';
	import { Query_userProfileConnectionStore, Mutation_userProfileStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userProfileConnection = data.Query_userProfileConnection as Query_userProfileConnectionStore;
	$: nodes = $Query_userProfileConnection.data?.userProfileConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userProfileConnection.data?.userProfileConnection?.totalCount || 0;
	const Mutation_userProfile = new Mutation_userProfileStore();
	let errors: Record<number, Error> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserProfileConnectionArgs;
			then: (data: (UserProfile | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		Query_userProfileConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userProfileConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('UserProfile', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_userProfile.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userProfile);
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
		to(`./user-profile/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user-profile/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./user-profile/${event.detail.path}`);
	};
</script>
<UserProfileConnectionTable
	bind:nodes
	{totalCount}
	{errors}
	isFetching={$Query_userProfileConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
