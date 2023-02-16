<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserPhonesForm from '~/lib/components/objects/user-phones/UserPhonesForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userPhonesStore, Mutation_userPhonesStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserPhonesArgs, UserPhones } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userPhones = data.Query_userPhones as Query_userPhonesStore;
	$: node = $Query_userPhones.data?.userPhones;
	const Mutation_userPhones = new Mutation_userPhonesStore();
	let errors: Record<string, Error> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs;
			update?: boolean;
			then: (data: UserPhones | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		validate('UserPhones', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_userPhones.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userPhones);
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

<UserPhonesForm
	{node}
	{errors}
	isFetching={$Query_userPhones.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
