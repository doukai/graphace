<script lang="ts">
	import PageInfoCreateForm from '~/lib/components/objects/page-info/PageInfoCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { GQL_MutationPageInfo } from '$houdini';
	import type { MutationTypePageInfoArgs, PageInfo } from '~/lib/types/schema';

	let node: MutationTypePageInfoArgs = {};

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

<PageInfoCreateForm {node} on:mutation={mutation} />
