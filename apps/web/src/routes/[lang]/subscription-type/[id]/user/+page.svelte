<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_userStore, Mutation_subscriptionType_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeUserArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_subscriptionType_user = data.Query_subscriptionType_user as Query_subscriptionType_userStore;
	$: subscriptionType = $Query_subscriptionType_user.data?.subscriptionType;
	$: node = subscriptionType?.user;
	const Mutation_subscriptionType_user = new Mutation_subscriptionType_userStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('User', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType_user.mutate({
					subscriptionType_: subscriptionType?.,
					subscriptionType_user: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.subscriptionType?.user);
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
		to(`../../user/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<UserForm
		{node}
		{errors}
		isFetching={$Query_subscriptionType_user.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<UserCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}