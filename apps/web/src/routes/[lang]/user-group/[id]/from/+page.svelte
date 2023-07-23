<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_userGroup_fromStore, Mutation_userGroup_fromStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	$: Query_userGroup_from = data.Query_userGroup_from as Query_userGroup_fromStore;
	$: userGroup = $Query_userGroup_from.data?.userGroup;
	$: node = userGroup?.from;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	const Mutation_userGroup_from = new Mutation_userGroup_fromStore();
	const Mutation_user = new Mutation_userStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('User', event.detail.args, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_user.mutate({ ...event.detail.args, update: true })
					.then((result) => {
						event.detail.then(result?.data?.user);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const createMutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserGroup', { from: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_userGroup_from.mutate({
					userGroup_id: userGroup?.id,
					userGroup_from: event.detail.args,
					update: true
				})
					.then((result) => {
						event.detail.then(result?.data?.userGroup?.from);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.from.iterms;
			});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		if (node) {
			to(`../../user/${event.detail.path}`);
		} else {
			to(`../../user/${event.detail.path}`, {
				node: updateNodeParam($page.url, createNode),
				errors: updateErrorsParam($page.url, errors),
				path: getChildPathParam($page.url, event.detail.name)
			});
		}
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./from/~`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

{#if node}
	<UserForm
		{node}
		{errors}
		isFetching={$Query_userGroup_from.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<UserCreateForm
		node={createNode}
		{errors}
		on:mutation={createMutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}