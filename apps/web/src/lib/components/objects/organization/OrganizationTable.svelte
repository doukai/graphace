<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Error } from '@graphace/commons/types';
	import { ObjectTd, IntTh, IntTd, StringTh, StringTd, TimestampTh, TimestampTd, IDTh, IDTd, BooleanTh, BooleanTd } from '@graphace/ui-graphql/components/table';
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
	import {
		Conditional,
		Operator,
		Organization,
		OrganizationOrderBy,
		QueryTypeOrganizationListArgs,
		MutationTypeOrganizationArgs
	} from '~/lib/types/schema';

	export let nodes: (Organization | null | undefined)[] | null | undefined;
	export let isFetching: boolean;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeOrganizationListArgs;
			then: (data: (Organization | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		};
		mutation: {
			args: MutationTypeOrganizationArgs;
			update?: boolean;
			then: (data: Organization | null | undefined) => void;
			catch: (error: Error) => void;
		};
		edit: { id: string };
		create: {};
	}>();

	let errors: Record<string, Record<string, Error>> = {};

	let showDeleteButton = false;
	let searchValue: string | undefined;
	let args: QueryTypeOrganizationListArgs = {};
	let orderBy: OrganizationOrderBy = {};

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
		if (Object.keys(orderBy).length > 0) {
			args.orderBy = orderBy;
		} else {
			args.orderBy = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	const search = () => {
		let args: QueryTypeOrganizationListArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
			args.createGroupId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.name = { opr: Operator.LK, val: `%${searchValue}%` };
			args.realmId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.createGroupId = undefined;
			args.createUserId = undefined;
			args.name = undefined;
			args.realmId = undefined;
			args.updateUserId = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	async function updateField(args: MutationTypeOrganizationArgs | null | undefined) {
		if (args && args.id) {
			errors[args.id] = {};
			validateUpdate('Organization', args, $locale)
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
			update: true,
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
			update: true,
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

<SectionHead title="Organization">
	<SearchInput bind:value={searchValue} on:search={search} />
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
				dispatch('create');
			} }
		>
			<Icon src={Plus} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('create');
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
			<IntTh
				name="aboveId"
				bind:expression={args.aboveId}
				bind:sort={orderBy.aboveId}
				on:filter={query}
			/>
			<StringTh
				name="createGroupId"
				bind:expression={args.createGroupId}
				bind:sort={orderBy.createGroupId}
				on:filter={query}
			/>
			<TimestampTh
				name="createTime"
				bind:expression={args.createTime}
				bind:sort={orderBy.createTime}
				on:filter={query}
			/>
			<StringTh
				name="createUserId"
				bind:expression={args.createUserId}
				bind:sort={orderBy.createUserId}
				on:filter={query}
			/>
			<IDTh
				name="id"
				bind:expression={args.id}
				bind:sort={orderBy.id}
				on:filter={query}
			/>
			<th>isDeprecated</th>
			<StringTh
				name="name"
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={query}
			/>
			<th>orgLevel3</th>
			<StringTh
				name="realmId"
				bind:expression={args.realmId}
				bind:sort={orderBy.realmId}
				on:filter={query}
			/>
			<th>roleDisable</th>
			<TimestampTh
				name="updateTime"
				bind:expression={args.updateTime}
				bind:sort={orderBy.updateTime}
				on:filter={query}
			/>
			<StringTh
				name="updateUserId"
				bind:expression={args.updateUserId}
				bind:sort={orderBy.updateUserId}
				on:filter={query}
			/>
			<th>userByOrg</th>
			<th>users</th>
			<th>usersConnection</th>
			<IntTh
				name="version"
				bind:expression={args.version}
				bind:sort={orderBy.version}
				on:filter={query}
			/>
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={13 + 2}/>
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
							<IntTd
								name="aboveId"
								bind:value={node.aboveId}
								on:save={() => updateField({ id: node?.id, aboveId: node?.aboveId })}
								error={errors[node.id]?.aboveId}
							/>
							<StringTd
								name="createGroupId"
								bind:value={node.createGroupId}
								on:save={() => updateField({ id: node?.id, createGroupId: node?.createGroupId })}
								error={errors[node.id]?.createGroupId}
							/>
							<TimestampTd
								name="createTime"
								bind:value={node.createTime}
								on:save={() => updateField({ id: node?.id, createTime: node?.createTime })}
								error={errors[node.id]?.createTime}
							/>
							<StringTd
								name="createUserId"
								bind:value={node.createUserId}
								on:save={() => updateField({ id: node?.id, createUserId: node?.createUserId })}
								error={errors[node.id]?.createUserId}
							/>
							<td>{node.id}</td>
							<BooleanTd
								name="isDeprecated"
								bind:value={node.isDeprecated}
								on:save={() => updateField({ id: node?.id, isDeprecated: node?.isDeprecated })}
								error={errors[node.id]?.isDeprecated}
							/>
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={() => updateField({ id: node?.id, name: node?.name })}
								error={errors[node.id]?.name}
							/>
							<td>{node.orgLevel3}</td>
							<StringTd
								name="realmId"
								bind:value={node.realmId}
								on:save={() => updateField({ id: node?.id, realmId: node?.realmId })}
								error={errors[node.id]?.realmId}
							/>
							<td>{node.roleDisable}</td>
							<TimestampTd
								name="updateTime"
								bind:value={node.updateTime}
								on:save={() => updateField({ id: node?.id, updateTime: node?.updateTime })}
								error={errors[node.id]?.updateTime}
							/>
							<StringTd
								name="updateUserId"
								bind:value={node.updateUserId}
								on:save={() => updateField({ id: node?.id, updateUserId: node?.updateUserId })}
								error={errors[node.id]?.updateUserId}
							/>
							<ObjectTd name="userByOrg" path={`${node.id}/user-by-org`} on:gotoField />
							<ObjectTd name="users" path={`${node.id}/users`} on:gotoField />
							<ObjectTd name="usersConnection" path={`${node.id}/users-connection`} on:gotoField />
							<IntTd
								name="version"
								bind:value={node.version}
								on:save={() => updateField({ id: node?.id, version: node?.version })}
								error={errors[node.id]?.version}
							/>
							<td>
								<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click={(e) => {
											e.preventDefault();
											if (node && node.id) {
												dispatch('edit', { id: node.id });
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
