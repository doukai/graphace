<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupCreateForm from '~/lib/components/objects/group/GroupCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_user_groupsStore } from '$houdini';
	import type { MutationTypeGroupArgs, Group } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeGroupArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_user_groups = new Mutation_user_groupsStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('User', { groups: [event.detail.args] }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_groups.mutate({
					user_id: id,
					user_groups: [event.detail.args],
					update: true,
					mergeToList: ['groups']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.groups.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../group/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<GroupCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
