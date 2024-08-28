<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, messageBoxs, notifications } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		FileOrderBy,
		QueryFileListArgs,
		FileInput
	} from '~/lib/types/schema';

	export let nodes: (FileInput | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	const buildGraphQLErrors = getContext('buildGraphQLErrors') as GraphQLErrorsFunction;
	const buildGlobalGraphQLErrorMessage = getContext('buildGlobalGraphQLErrorMessage') as GlobalGraphQLErrorMessageFunction;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryFileListArgs;
			then: (data: (FileInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: FileInput;
			then: (data: FileInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: FileInput[];
			then: (data: FileInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (FileInput | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	export let args: QueryFileListArgs = {};
	export let orderBy: FileOrderBy = {};

	let selectAll: boolean;
	export let selectedIdList: (string | null | undefined)[] = [];

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

	const removeRow = (id: string) => {
		dispatch('mutation', {
			args: { where: { id: { val: id } }, isDeprecated: true },
			then: (data) => {
				notifications.success($LL.graphence.message.removeSuccess());
				query();
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.removeFailed(),
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

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: 'IN', arr: selectedIdList} },
				isDeprecated: true
			},
			then: (data) => {
				notifications.success($LL.graphence.message.removeSuccess());
				query();
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.removeFailed(),
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
	};

	const unbindRows = (selectedIdList: (string | null | undefined)[]) => {
		dispatch('parentMutation', {
			args: selectedIdList
				.map((id) => {
					return {where: { id: { val: id } }, isDeprecated: true};
				}),
			then: (data) => {
				notifications.success($LL.graphence.message.unbindSuccess());
				query();
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.unbindFailed(),
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
	};
</script>

<TableHead
	title={$LL.graphql.objects.File.name()}
	showRemoveButton={permissions.auth('File::*::WRITE') && showRemoveButton && selectedIdList.length > 0}
	showUnbindButton={permissions.auth('File::*::WRITE') && showUnbindButton && selectedIdList.length > 0}
	showSaveButton={permissions.auth('File::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('File::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:create
	on:search={(e) => search(e.detail.value)}
	on:save={(e) => dispatch('save', { nodes })}
	on:remove={(e) => {
		messageBoxs.open({
			title: $LL.graphence.components.table.removeModalTitle(),
			buttonName: $LL.graphence.components.table.removeBtn(),
			buttonType: 'error',
			confirm: () => {
				removeRows();
				return true;
			}
		});
	}}
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.graphence.components.table.unbindModalTitle(),
			buttonName: $LL.graphence.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbindRows(selectedIdList);
				return true;
			},
			button1: {
				name: $LL.graphence.components.table.removeBtn(),
				className: 'btn-error',
				onClick: () => {
					removeRows();
					return true;
				}
			}
		})}
	on:gotoSelect
	on:back
/>
<div class="divider" />
<Table className="table-zebra md:table-sm">
	<thead>
		<tr class="z-20">
			<th class="w-12">
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
									<input type="checkbox" class="checkbox md:checkbox-sm" bind:group={selectedIdList} value={node.id} />
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
							{#if permissions.auth('File::*::WRITE')}
							<th class="z-10 hover:z-30 w-24">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.graphence.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('edit', {id: node.id});
												}
											}}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
									{#if showUnbindButton}
										<div class="tooltip" data-tip={$LL.graphence.components.table.unbindBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.graphence.components.table.unbindModalTitle(),
														buttonName: $LL.graphence.components.table.unbindBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																unbindRows([node.id]);
															}
															return true;
														},
														button1: {
															name: $LL.graphence.components.table.removeBtn(),
															className: 'btn-error',
															onClick: () => {
																if (node?.id) {
																	removeRow(node.id);
																}
																return true;
															}
														}
													});
												}}
											>
												<Icon src={ArchiveBoxXMark} solid />
											</button>
										</div>
									{:else}
										<div class="tooltip" data-tip={$LL.graphence.components.table.removeBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.graphence.components.table.removeModalTitle(),
														buttonName: $LL.graphence.components.table.removeBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																removeRow(node.id);
															}
															return true;
														}
													});
												}}
											>
												<Icon src={Trash} solid />
											</button>
										</div>
									{/if}
								</div>
							</th>
							{/if}
						</tr>
					{/if}
				{/each}
			{:else}
				<TableEmpty cols={4 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
