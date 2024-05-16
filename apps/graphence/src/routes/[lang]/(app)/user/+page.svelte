<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import UserConnectionTable from '~/lib/components/objects/user/UserConnectionTable.svelte';
	import GroupTreeCard from '~/lib/components/objects/group/GroupTreeCard.svelte';
	import type { UserInput, QueryUserConnectionArgs, MutationUserArgs } from '~/lib/types/schema';
	import { Query_userConnectionStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.name());
	$: Query_userConnection = data.Query_userConnection as Query_userConnectionStore;
	$: nodes = $Query_userConnection.data?.userConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userConnection.data?.userConnection?.totalCount || 0;
	const Mutation_user = new Mutation_userStore();
	let errors: Record<number, Errors> = {};
	let args: QueryUserConnectionArgs = {};
	let groupId: string | null | undefined = undefined;

	const fetch = (
		event: CustomEvent<{
			args: QueryUserConnectionArgs;
			then: (data: (UserInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_userConnection.fetch({ variables: event.detail.args }).then((result) => {
			if (result.errors) {
				event.detail.catch(result.errors);
			} else {
				event.detail.then(result.data?.userConnection?.edges?.map((edge) => edge?.node));
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
		const row = nodes
			?.map((node) => node?.id)
			?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validate('Mutation_user_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_user.mutate(event.detail.args).then((result) => {
					if (result.errors) {
						event.detail.catch(result.errors);
					} else {
						event.detail.then(result?.data?.user);
					}
				});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
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

<div class="flex xl:items-start xl:flex-row xl:gap-2">
	<div class="hidden xl:flex xl:basis-1/5">
		<GroupTreeCard
			bind:activeGroupId={groupId}
			on:change={(e) => {
				if (e.detail.activeId) {
					args.groups = { id: { val: e.detail.activeId } };
				} else {
					args.groups = undefined;
				}
				Query_userConnection.fetch({ variables: { ...args, first: 10 } });
			}}
		/>
	</div>
	<div class="w-full xl:basis-4/5">
		<Card>
			<UserConnectionTable
				showSaveButton={false}
				showBackButton={$canBack}
				bind:args
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
		</Card>
	</div>
</div>
