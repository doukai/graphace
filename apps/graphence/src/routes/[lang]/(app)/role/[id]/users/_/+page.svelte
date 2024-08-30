<script lang="ts">
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import UserCreateForm from '~/lib/components/objects/user/UserCreateForm.svelte';
	import { Mutation_role_usersStore, Mutation_singleUploadStore } from '$houdini';
	import type { UserInput, MutationUserArgs } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.users.name(), PageType.CREATE);
	$: node = data.node as MutationUserArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_role_users = new Mutation_role_usersStore();
	const Mutation_singleUpload = new Mutation_singleUploadStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationUserArgs;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', { id: id, users: [event.detail.args] }, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_users.mutate({
					role_id: id,
					role_users: [event.detail.args]
				})
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(undefined);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.users.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../user/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<Card>
	<UserCreateForm 
		showBackButton={$canBack}
		{node}
		{errors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
		on:upload={(e) => {
			Mutation_singleUpload.mutate({ file: e.detail.file }).then((result) =>
				e.detail.then(result.data?.singleUpload)
			);
		}}
	/>
</Card>
