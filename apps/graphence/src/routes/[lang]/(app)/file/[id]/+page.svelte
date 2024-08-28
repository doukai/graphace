<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import FileForm from '~/lib/components/objects/file/FileForm.svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import type { FileInput, MutationFileArgs } from '~/lib/types/schema';
	import { Query_fileStore, Mutation_fileStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_file = data.Query_file as Query_fileStore;
	$: node = $Query_file.data?.file;
	$: urlName($page.url, node?.name || '');
	const Mutation_file = new Mutation_fileStore();
	let errors: Record<string, Errors> = {};

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

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`);
	};
</script>

<Card>
	<FileForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$Query_file.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
