<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { createQuery_fileConnection_Store } from '~/lib/stores/query/query_fileConnection_store';
	import FileTable from '~/lib/components/objects/file/FileTable.svelte';
	import { getLoadEvent } from '~/utils';
	import type { QueryFileConnectionArgs, FileOrderBy, FileInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: FileInput | (FileInput | null | undefined)[] | null | undefined = undefined;
	export let singleChoice: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'p-1';
	export { className as class };
	const permissions = getContext<PermissionsStore>('permissions');

	const dispatch = createEventDispatcher<{
		select: {
			value: FileInput | (FileInput | null | undefined)[] | null | undefined;
		};
	}>();

	const query_fileConnection_Store = createQuery_fileConnection_Store(getLoadEvent());
	$: nodes = $query_fileConnection_Store.response.data?.fileConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_fileConnection_Store.response.data?.fileConnection?.totalCount || 0;
	let args: QueryFileConnectionArgs = {};
	let orderBy: FileOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let selectedIdList: (string | null | undefined)[] | undefined = [];
	let close: () => void;

	if (Array.isArray(value)) {
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
		selectedIdList = value?.map((node) => node?.where?.id?.val);
	} else if (value) {
		value = { where: { id: { val: value.id } } };
		selectedIdList = [value.where?.id?.val];
	}

	$: if (Array.isArray(value)) {
		selectedIdList = value?.map((node) => node?.where?.id?.val);
	} else if (value) {
		selectedIdList = [value.where?.id?.val];
	}

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_fileConnection_Store.fetch(buildArguments(args)).then((result) => {
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};
</script>

<Dialog bind:close>
	<div class="flex items-center" slot="trigger" let:trigger let:zIndex>
		<div class="tooltip hover:z-[{zIndex + 3}]" data-tip={$LL.ui.button.select()}>
			<button
				use:melt={trigger}
				class="btn btn-square btn-outline {className}"
				{disabled}
				on:click={(e) => query(1)}
			>
				<Icon src={ListBullet} class="h-5 w-5" />
			</button>
		</div>
	</div>
	<svelte:fragment let:zIndex>
		<FileTable
			value={nodes}
			bind:selectedIdList
			bind:args
			bind:orderBy
			showEditButton={!readonly}
			showCreateButton={!readonly}
			showSelectButton={!readonly && (!singleChoice || selectedIdList?.length === 1)}
			isFetching={$query_fileConnection_Store.isFetching}
			{zIndex}
			fields={{
				name: {
					readonly: !permissions.auth('File::name::WRITE'),
					disabled: !permissions.auth('File::name::WRITE'),
					hidden: !permissions.auth('File::name::READ')
				},
				contentType: {
					readonly: !permissions.auth('File::contentType::WRITE'),
					disabled: !permissions.auth('File::contentType::WRITE'),
					hidden: !permissions.auth('File::contentType::READ')
				},
				content: {
					readonly: !permissions.auth('File::content::WRITE'),
					disabled: !permissions.auth('File::content::WRITE'),
					hidden: !permissions.auth('File::content::READ')
				},
				url: {
					readonly: !permissions.auth('File::url::WRITE'),
					disabled: !permissions.auth('File::url::WRITE'),
					hidden: !permissions.auth('File::url::READ')
				}
			}}
			on:select={(e) => {
				if (Array.isArray(e.detail.value)) {
					if (singleChoice) {
						value = [{ where: { id: { val: e.detail.value?.[0]?.id } } }];
					} else {
						value = e.detail.value.map((node) => ({ where: { id: { val: node?.id } } }));
					}
				} else {
					value = [{ where: { id: { val: e.detail.value?.id } } }];
				}
				dispatch('select', { value });
				close();
			}}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						contentType: { opr: 'LK', val: e.detail.value },
						content: { opr: 'LK', val: e.detail.value },
						url: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					};
				} else {
					args = { first: pageSize, offset: 0 };
				}
				query();
			}}
			on:query={(e) => query()}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`./file/${e.detail.value.id}`);
				}
			}}
			on:create={(e) => to('./file/_')}
		/>
		<div class="divider" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</svelte:fragment>
</Dialog>
