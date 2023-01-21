<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { IntTh, IntTd } from '@graphace/ui-graphql/components/table';
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
		RoleConnection,
		RoleConnectionOrderBy,
		QueryTypeRoleConnectionListArgs,
		MutationTypeRoleConnectionArgs
	} from '~/gql/generated/schema';

	export let nodes: (RoleConnection | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeRoleConnectionListArgs;
			then: (data: (RoleConnection | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		};
		mutation: {
			args: MutationTypeRoleConnectionArgs;
			then: (data: RoleConnection | null | undefined) => void;
			catch: (error: Error) => void;
		};
	}>();

	let errors: Record<string, Record<string, Error>> = {};

	let showDeleteButton = false;
	let queryValue: string | undefined;
	let args: QueryTypeRoleConnectionListArgs = {};
	let orderBy: RoleConnectionOrderBy = {};
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
			args.login = { opr: Operator.LK, val: `%${queryValue}%` };
			args.name = { opr: Operator.LK, val: `%${queryValue}%` };
			args.phones = { opr: Operator.LK, val: `%${queryValue}%` };
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

	async function updateField(args: MutationTypeRoleConnectionArgs | null | undefined) {
		if (args && args.id) {
			errors[args.id] = {};
			validateUpdate('RoleConnection', args, $locale)
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

<SectionHead title="RoleConnection">
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
				goto('./role-connection/+');
			} }
		>
			<Icon src={Plus} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			goto('./role-connection/+');
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
				name="name"
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={query}
			/>
			<StringTh
				name="login"
				bind:expression={args.login}
				bind:sort={orderBy.login}
				on:filter={query}
			/>
			<StringTh
				name="password"
				bind:expression={args.password}
				bind:sort={orderBy.password}
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
								name="name"
								bind:value={node.name}
								on:save={() => updateField({ id: node?.id, name: node?.name })}
								error={errors[node.id]?.name}
							/>
							<StringTd
								name="login"
								bind:value={node.login}
								on:save={() => updateField({ id: node?.id, login: node?.login })}
								error={errors[node.id]?.login}
							/>
							<StringTd
								name="password"
								bind:value={node.password}
								on:save={() => updateField({ id: node?.id, password: node?.password })}
								error={errors[node.id]?.password}
							/>
							<td>
								<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click={(e) => {
											e.preventDefault();
											if (node) {
												goto(`./role-connection/${node.id}`);
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
