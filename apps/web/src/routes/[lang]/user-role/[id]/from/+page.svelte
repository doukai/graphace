<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_userRole_fromStore, Mutation_userRole_fromStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	$: Query_userRole_from = data.Query_userRole_from as Query_userRole_fromStore;
	$: userRole = $Query_userRole_from.data?.userRole;
	$: node = userRole?.from;
	const Mutation_userRole_from = new Mutation_userRole_fromStore();
	const Mutation_user = new Mutation_userStore();
	let errors: Record<number, Errors> = {};

	const create = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserRole', { from: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_userRole_from.mutate({
					userRole_id: userRole?.id,
					userRole_from: event.detail.args,
					update: true
				})
					.then((result) => {
						event.detail.then(result?.data?.userRole?.from);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.from.iterms;
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
		isFetching={$Query_userRole_from.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<UserCreateForm
		{errors}
		on:mutation={create}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}