<script lang="ts">
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import FileForm from '~/lib/components/objects/file/FileForm.svelte';
	import FileCreateForm from '~/lib/components/objects/file/FileCreateForm.svelte';
	import type { FileInput, MutationFileArgs } from '~/lib/types/schema';
	import { Query_user_avatarStore, Mutation_user_avatarStore, Mutation_fileStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.fields.avatar.name());
	$: Query_user_avatar = data.Query_user_avatar as Query_user_avatarStore;
	$: user = $Query_user_avatar.data?.user;
	$: node = user?.avatar;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	const Mutation_user_avatar = new Mutation_user_avatarStore();
	const Mutation_file = new Mutation_fileStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationFileArgs;
			then: (data: FileInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_file_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_file.mutate(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.file);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const parentMutation = (
		event: CustomEvent<{
			args: MutationFileArgs | null;
			then: (data: FileInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_user_Arguments', { where: { id: { val: user?.id } }, avatar: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_avatar.mutate({
					user_id: user?.id,
					user_avatar: event.detail.args
				})
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.user?.avatar);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.avatar.iterms;
			});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		if (node) {
			to(`../../file/${event.detail.path}`);
		} else {
			to(`../../file/${event.detail.path}`, {
				node: updateNodeParam($page.url, createNode),
				errors: updateErrorsParam($page.url, errors),
				path: getChildPathParam($page.url, event.detail.name)
			});
		}
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./avatar/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	{#if node}
		<FileForm
			showGotoSelectButton={true}
			{node}
			{errors}
			showRemoveButton={false}
			showUnbindButton={true}
			showBackButton={$canBack}
			isFetching={$Query_user_avatar.fetching}
			on:mutation={mutation}
			on:parentMutation={parentMutation}
			on:gotoField={gotoField}
			on:gotoSelect={gotoSelect}
			on:back={back}
		/>
	{:else}
		<FileCreateForm
			showGotoSelectButton={true}
			showBackButton={$canBack}
			node={createNode}
			{errors}
			on:mutation={parentMutation}
			on:gotoField={gotoField}
			on:gotoSelect={gotoSelect}
			on:back={back}
		/>
	{/if}
</Card>