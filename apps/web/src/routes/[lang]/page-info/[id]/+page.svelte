<script lang="ts">
	import PageInfoForm from '~/lib/components/objects/page-info/PageInfoForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import type { QueryPageInfoStore } from '$houdini';
	import { GQL_MutationPageInfo } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypePageInfoArgs, PageInfo } from '~/lib/types/schema';

	export let data: PageData;
	$: QueryPageInfo = data.QueryPageInfo as QueryPageInfoStore;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypePageInfoArgs;
			then: (data: PageInfo | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		GQL_MutationPageInfo.mutate(event.detail.args)
			.then((result) => {
				event.detail.then(result?.pageInfo);
			})
			.catch((error) => {
				event.detail.catch(error);
			});
	};
</script>

<PageInfoForm node={$QueryPageInfo.data?.pageInfo} isFetching={$QueryPageInfo.isFetching} on:mutation={mutation} />
