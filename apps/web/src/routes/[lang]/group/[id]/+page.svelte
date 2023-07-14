<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_groupStore, Mutation_groupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeGroupArgs, Group } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_group = data.Query_group as Query_groupStore;
	$: node = $Query_group.data?.group;
	const Mutation_group = new Mutation_groupStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			skipNullArguments?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Group', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_group.mutate({ ...event.detail.args, update: event.detail.update, skipNullArguments: event.detail.skipNullArguments })
					.then((result) => {
						event.detail.then(result?.data?.group);
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

<GroupForm
	{node}
	{errors}
	isFetching={$Query_group.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
