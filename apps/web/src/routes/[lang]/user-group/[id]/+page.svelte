<script lang="ts">
	import { ot, to, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserGroupForm from '~/lib/components/objects/user-group/UserGroupForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_userGroupStore, Mutation_userGroupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserGroupArgs, UserGroup } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userGroup = data.Query_userGroup as Query_userGroupStore;
	$: node = $Query_userGroup.data?.userGroup;
	$: urlName($page.url, node?.name || '');
	const Mutation_userGroup = new Mutation_userGroupStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserGroupArgs;
			update?: boolean;
			then: (data: UserGroup | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserGroup', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_userGroup.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.userGroup);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`);
	};
</script>

<UserGroupForm
	{node}
	{errors}
	isFetching={$Query_userGroup.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
