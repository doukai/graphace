<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { StringTh, StringTd, BooleanTh, BooleanTd } from '@graphace/ui-graphql/components/table';
	import { SectionHead } from '@graphace/ui/components/section';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import { validateUpdate } from '@graphace/graphql/schema/JsonSchema';
	import { Pagination } from '@graphace/ui/components/connection';
	import {
		Conditional,
		Operator,
		PageInfo,
		PageInfoOrderBy,
		QueryTypePageInfoListArgs,
		MutationTypePageInfoArgs
	} from '~/gql/generated/schema';

	export let nodes: (PageInfo | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypePageInfoListArgs;
			then: (data: (PageInfo | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		};
		mutation: {
			args: MutationTypePageInfoArgs;
			then: (data: PageInfo | null | undefined) => void;
			catch: (error: Error) => void;
		};
	}>();

	let errors: Record<string, Record<string, Error>> = {};

	let showDeleteButton = false;
	let queryValue: string | undefined;
	let args: QueryTypePageInfoListArgs = {};
	let orderBy: PageInfoOrderBy = {};
	let after: string | undefined;
	let before: string | undefined;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	$: offset = (pageNumber - 1) * pageSize;

	let selectAll: boolean;
	let selectedRows: Record<string, boolean> = {};

	$: selectedIdList = Object.keys(selectedRows)
		.filter((id) => selectedRows[id])
		.map((id) => id);

	$: if (selectedIdList.length > 0) {
		showDeleteButton = true;
	} else {
		showDeleteButton = false;
	}

	const query = () => {
		if (queryValue) {
			args = {};
			args.cond = Conditional.OR;
			args.endCursor = { opr: Operator.LK, val: `%${queryValue}%` };
			args.startCursor = { opr: Operator.LK, val: `%${queryValue}%` };
		} else {
			if (Object.keys(orderBy).length > 0) {
				args.orderBy = orderBy;
			} else {
				args.orderBy = undefined;
			}
		}

		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else if (offset) {
			args.offset = offset;
			args.first = pageSize;
		} else {
			args.first = pageSize;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	async function updateField(args: MutationTypePageInfoArgs | null | undefined) {
		if (args && args.id) {
			errors[args.id] = {};
			validateUpdate('PageInfo', args, $locale)
				.then((data) => {
					if (args) {
						dispatch('mutation', {
							args,
							then: (data) => {
								notifications.success($LL.message.saveSuccess());
							},
							catch: (error) => {
								console.error(error);
								notifications.error($LL.message.saveFailed());
							}
						});
					}
				})
				.catch((validErrors) => {
					if (args.id) {
						errors[args.id] = validErrors;
					}
				});
		}
	}

	async function removeRow(id: string) {
		dispatch('mutation', {
			args: { id: id, isDeprecated: true },
			then: (data) => {
				notifications.success($LL.message.removeSuccess());
				query();
			},
			catch: (error) => {
				console.error(error);
				notifications.error($LL.message.removeFailed());
			}
		});
	}

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: Operator.IN, in: selectedIdList } },
				isDeprecated: true
			},
			then: (data) => {
				notifications.success($LL.message.removeSuccess());
				query();
			},
			catch: (error) => {
				console.error(error);
				notifications.error($LL.message.removeFailed());
			}
		});
	};
</script>

<SectionHead title="PageInfo">
	<SearchInput bind:value={queryValue} on:search={query} />
	{#if showDeleteButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
			<button
				class="btn btn-error btn-outline btn-square"
				on:click={(e) => {
					e.preventDefault();
					messageBoxs.open({
						title: $LL.components.graphql.table.removeModalTitle(),
						buttonName: $LL.components.graphql.table.removeBtn(),
						buttonType: 'error',
						confirm: () => {
							removeRows();
							return true;
						}
					});
				}}
			>
				<Icon src={Trash} class="h-6 w-6" solid />
			</button>
		</div>
	{/if}
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				goto('./page-info/+');
			} }
		>
			<Icon src={Plus} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			goto('./page-info/+');
		}}
	>
		{$LL.routers.type.create()}
	</button>
</SectionHead>
<div class="divider" />
<Table>
	<thead>
		<tr>
			<th class="z-10">
				<label>
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={selectAll}
						on:change={() => {
							if (nodes && nodes.length > 0) {
								nodes.forEach((node) => {
									if (node?.id) {
										selectedRows[node.id] = selectAll;
									}
								});
							}
						}}
					/>
				</label>
			</th>
			<StringTh
				name="endCursor"
				bind:expression={args.endCursor}
				bind:sort={orderBy.endCursor}
				on:filter={query}
			/>
			<BooleanTh
				name="hasNextPage"
				bind:expression={args.hasNextPage}
				bind:sort={orderBy.hasNextPage}
				on:filter={query}
			/>
			<BooleanTh
				name="hasPreviousPage"
				bind:expression={args.hasPreviousPage}
				bind:sort={orderBy.hasPreviousPage}
				on:filter={query}
			/>
			<StringTh
				name="startCursor"
				bind:expression={args.startCursor}
				bind:sort={orderBy.startCursor}
				on:filter={query}
			/>
			<td />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading />
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10">
								<label>
									<input type="checkbox" class="checkbox" bind:checked={selectedRows[node.id]} />
								</label>
							</th>
							<StringTd
								name="endCursor"
								bind:value={node.endCursor}
								on:save={() => updateField({ : node?., endCursor: node?.endCursor })}
								error={errors[node.]?.endCursor}
							/>
							<BooleanTd
								name="hasNextPage"
								bind:value={node.hasNextPage}
								on:save={() => updateField({ : node?., hasNextPage: node?.hasNextPage })}
								error={errors[node.]?.hasNextPage}
							/>
							<BooleanTd
								name="hasPreviousPage"
								bind:value={node.hasPreviousPage}
								on:save={() => updateField({ : node?., hasPreviousPage: node?.hasPreviousPage })}
								error={errors[node.]?.hasPreviousPage}
							/>
							<StringTd
								name="startCursor"
								bind:value={node.startCursor}
								on:save={() => updateField({ : node?., startCursor: node?.startCursor })}
								error={errors[node.]?.startCursor}
							/>
							<td>
								<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click={(e) => {
											e.preventDefault();
											if (node) {
												goto(`./page-info/${node.id}`);
											}
										}}
									>
										<Icon src={PencilAlt} solid />
									</button>
								</div>
								<div class="tooltip" data-tip={$LL.components.graphql.table.removeBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click={(e) => {
											e.preventDefault();
											messageBoxs.open({
												title: $LL.components.graphql.table.removeModalTitle(),
												buttonName: $LL.components.graphql.table.removeBtn(),
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
							</td>
						</tr>
					{/if}
				{/each}
			{/if}
		</tbody>
	{/if}
</Table>
<div class="divider" />
<Pagination
	bind:pageNumber
	bind:pageSize
	{totalCount}
	on:pageChange={query}
	on:sizeChange={query}
/>
