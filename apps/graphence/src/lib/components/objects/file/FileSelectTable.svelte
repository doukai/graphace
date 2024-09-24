<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, messageBoxs, notifications } from '@graphace/ui';
	import { StringTh, StringTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		FileOrderBy,
		QueryFileListArgs,
		FileInput
	} from '~/lib/types/schema';

	export let nodes: (FileInput | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	const buildGraphQLErrors = getContext('buildGraphQLErrors') as GraphQLErrorsFunction;
	const buildGlobalGraphQLErrorMessage = getContext('buildGlobalGraphQLErrorMessage') as GlobalGraphQLErrorMessageFunction;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryFileListArgs;
			then: (data: (FileInput| null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: FileInput;
			then: (data: FileInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		select: {
			selected: FileInput | null | undefined | (FileInput | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	export let showSelectButton = false;
	export let args: QueryFileListArgs = {};
	export let orderBy: FileOrderBy = {};

	let selectAll: boolean;
	export let selectedIdList: string | null | undefined | (string | null | undefined)[] = multipleSelect
		? []
		: undefined;

	$: if (selectedIdList && !Array.isArray(selectedIdList) || Array.isArray(selectedIdList) && selectedIdList.length > 0) {
		showSelectButton = true;
	} else {
		showSelectButton = false;
	}

	export const query = () => {
		if (Object.keys(orderBy).length > 0) {
			args.orderBy = orderBy;
		} else {
			args.orderBy = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	export const search = (searchValue: string | undefined) => {
		let args: QueryFileListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
			args.contentType = { opr: 'LK', val: `%${searchValue}%` };
			args.content = { opr: 'LK', val: `%${searchValue}%` };
			args.url = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
			args.contentType = undefined;
			args.content = undefined;
			args.url = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const updateField = (args: FileInput | null | undefined, row?: number) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					if (nodes && row) {
						nodes[row] = data;
					}
					notifications.success($LL.graphence.message.saveSuccess());
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					errors = buildGraphQLErrors(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.saveFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								query();
								return true;
							}
						});
					}
				}
			});
		}
	}
</script>

<TableHead
	title={$LL.graphql.objects.File.name()}
	showCreateButton={false}
	showSaveButton={false}
	showRemoveButton={false}
	{showSelectButton}
	{showBackButton}
	on:search={(e) => search(e.detail.value)}
	on:select={(e) =>
		dispatch('select', {
			selected: Array.isArray(selectedIdList)
				? selectedIdList.flatMap((id) => nodes?.find((node) => node?.id === id)).map((node) => ({ name: node?.name, contentType: node?.contentType, content: node?.content, url: node?.url, where: { id: { val: node?.id } } }))
				: nodes?.filter((node) => node?.id === selectedIdList)?.map((node) => ({ name: node?.name, contentType: node?.contentType, content: node?.content, url: node?.url, where: { id: { val: node?.id } } }))[0],
			then: () => {
				notifications.success($LL.graphence.message.saveSuccess());
				dispatch('back', {});
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.saveFailed());
			}
		})}
	on:back
/>
<div class="divider" />
<Table className="table-zebra table-pin-rows table-pin-cols md:table-sm">
	<thead>
		<tr class="z-20">
			<th class="w-12">
				{#if multipleSelect}
					<label>
						<input
							type="checkbox"
							class="checkbox md:checkbox-sm"
							bind:checked={selectAll}
							on:change={(e) => {
								if (nodes && nodes.length > 0) {
									selectedIdList = selectAll ? nodes.map((node) => node?.id) : [];
								}
							}}
						/>
					</label>
				{/if}
			</th>
			{#if permissions.auth('File::name::*')}
			<StringTh
				name={$LL.graphql.objects.File.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('File::contentType::*')}
			<StringTh
				name={$LL.graphql.objects.File.fields.contentType.name()}
				bind:expression={args.contentType}
				bind:sort={orderBy.contentType}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('File::content::*')}
			<StringTh
				name={$LL.graphql.objects.File.fields.content.name()}
				bind:expression={args.content}
				bind:sort={orderBy.content}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('File::url::*')}
			<StringTh
				name={$LL.graphql.objects.File.fields.url.name()}
				bind:expression={args.url}
				bind:sort={orderBy.url}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={4 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									{#if multipleSelect}
										<input type="checkbox" class="checkbox md:checkbox-sm" bind:group={selectedIdList} value={node.id} />
									{:else}
										<input type="radio" class="radio md:radio-sm" bind:group={selectedIdList} value={node.id} />
									{/if}
								</label>
							</th>
							{#if permissions.auth('File::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('File::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('File::contentType::*')}
							<StringTd
								name="contentType"
								bind:value={node.contentType}
								on:save={(e) => updateField({ contentType: node?.contentType, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('File::contentType::WRITE')}
								errors={errors[row]?.iterms?.contentType}
							/>
							{/if}
							{#if permissions.auth('File::content::*')}
							<StringTd
								name="content"
								bind:value={node.content}
								on:save={(e) => updateField({ content: node?.content, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('File::content::WRITE')}
								errors={errors[row]?.iterms?.content}
							/>
							{/if}
							{#if permissions.auth('File::url::*')}
							<StringTd
								name="url"
								bind:value={node.url}
								on:save={(e) => updateField({ url: node?.url, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('File::url::WRITE')}
								errors={errors[row]?.iterms?.url}
							/>
							{/if}
							<th class="z-10 hover:z-30 w-12">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.graphence.components.table.selectBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('select', {
														selected: multipleSelect 
																	? [{ name: node?.name, contentType: node?.contentType, content: node?.content, url: node?.url, where: { id: { val: node.id } } }] 
																	: { name: node?.name, contentType: node?.contentType, content: node?.content, url: node?.url, where: { id: { val: node.id } } },
														then: () => {
															notifications.success($LL.graphence.message.saveSuccess());
															dispatch('back', {});
														},
														catch: (errors) => {
															console.error(errors);
															notifications.error($LL.graphence.message.saveFailed());
														}
													});
												}
											}}
										>
											<Icon src={ArchiveBoxArrowDown} solid />
										</button>
									</div>
								</div>
							</th>
						</tr>
					{/if}
				{/each}
			{:else}
				<TableEmpty cols={4 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
