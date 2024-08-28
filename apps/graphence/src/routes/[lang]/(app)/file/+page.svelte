<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import FileConnectionTable from '~/lib/components/objects/file/FileConnectionTable.svelte';
	import type { FileInput, QueryFileConnectionArgs, MutationFileArgs } from '~/lib/types/schema';
	import { Query_fileConnectionStore, Mutation_fileStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.File.name());
	$: Query_fileConnection = data.Query_fileConnection as Query_fileConnectionStore;
	$: nodes = $Query_fileConnection.data?.fileConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_fileConnection.data?.fileConnection?.totalCount || 0;
	const Mutation_file = new Mutation_fileStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryFileConnectionArgs;
			then: (data: (FileInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_fileConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.fileConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationFileArgs;
			then: (data: FileInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validate('Mutation_file_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
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
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./file/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./file/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./file/${event.detail.path}`);
	};
</script>

<Card>
	<FileConnectionTable
		showSaveButton={false}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$Query_fileConnection.fetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:edit={edit}
		on:create={create}
		on:gotoField={gotoField}
	/>
</Card>
