<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserArgs, User } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_user = data.Query_user as Query_userStore;
	$: node = $Query_user.data?.user;
	const Mutation_user = new Mutation_userStore();
	let errors: Record<string, Error> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		validate('User', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_user.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.user);
					})
					.catch((error) => {
						event.detail.catch(error);
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

<UserForm
	{node}
	{errors}
	isFetching={$Query_user.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
