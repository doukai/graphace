<script lang="ts">
	import { goto } from '$app/navigation';
	import { __schema } from '~/gql/generated/introspection.json';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import { StringTh, StringTd } from '@graphace/ui-graphql/components/introspection/table';
	import { SectionHead, SectionLoading } from '@graphace/ui/components/section';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import { Pagination } from '@graphace/ui/components/connection';
	import {
		Conditional,
		Operator,
		QueryUserConnection$input,
		QueryUserConnectionStore,
		UserOrderBy,
		GQL_UpdateUser,
		UpdateUser$input
	} from '$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: QueryUserConnection = data.QueryUserConnection as QueryUserConnectionStore;
	$: nodes = $QueryUserConnection.data?.userConnection?.edges?.map((edge) => edge?.node) as (
		| UpdateUser$input
		| null
		| undefined
	)[];
	$: totalCount = $QueryUserConnection.data?.userConnection?.totalCount || 0;
	let errors: Record<string, Record<string, Error>> = {};

	const manager: TypeManager = new TypeManager();

	let showDeleteButton = false;
	let idList: string[] = [];
	let queryValue: string | undefined;
	let variables: QueryUserConnection$input = {};
	let orderBy: UserOrderBy = {};
	let after: string | undefined;
	let before: string | undefined;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	$: offset = (pageNumber - 1) * pageSize;

	let selectedRows: Record<string, boolean> = {};
	$: selectedIdList = Object.keys(selectedRows)
		.filter((id) => selectedRows[id])
		.map((id) => id);

	$: selectedDataList = Object.keys(selectedRows)
		.filter((id) => selectedRows[id])
		.map((id) => nodes.find((node) => node?.id === id));

	let selectAll: boolean;

	const query = () => {
		if (queryValue) {
			variables = {};
			variables.cond = Conditional.OR;
			variables.login = { opr: Operator.LK, val: `%${queryValue}%` };
			variables.name = { opr: Operator.LK, val: `%${queryValue}%` };
			variables.phones = { opr: Operator.LK, val: `%${queryValue}%` };
		} else {
			if (Object.keys(orderBy).length > 0) {
				variables.orderBy = orderBy;
			} else {
				variables.orderBy = undefined;
			}
		}

		if (after) {
			variables.after = after;
			variables.first = pageSize;
		} else if (before) {
			variables.before = before;
			variables.last = pageSize;
		} else if (offset) {
			variables.offset = offset;
			variables.first = pageSize;
		} else {
			variables.first = pageSize;
		}

		QueryUserConnection.fetch({ variables });
	};

	const selectChange = (event: CustomEvent<{ selectedIdList: string[] }>) => {
		idList = event.detail.selectedIdList;
		if (event.detail.selectedIdList.length > 0) {
			showDeleteButton = true;
		} else {
			showDeleteButton = false;
		}
	};

	async function updateField(node: UpdateUser$input | null | undefined) {
		if (node && node.id) {
			errors[node.id] = {};
			validate('User', node, $locale)
				.then((data) => {
					if (node) {
						GQL_UpdateUser.mutate(node)
							.then(() => {
								notifications.success($LL.message.saveSuccess());
							})
							.catch((error) => {
								console.error(error);
								notifications.error($LL.message.saveFailed());
							});
					}
				})
				.catch((validErrors) => {
					if (node.id) {
						errors[node.id] = validErrors;
					}
				});
		}
	}

	async function removeRow(id: string) {
		GQL_UpdateUser.mutate({ id: id, isDeprecated: true })
			.then(() => {
				notifications.success($LL.message.saveSuccess());
			})
			.catch((error) => {
				console.error(error);
				notifications.error($LL.message.saveFailed());
			});
	}

	const removeRows = () => {
		GQL_UpdateUser.mutate({
			isDeprecated: true,
			where: { id: { opr: Operator.IN, in: selectedIdList } }
		})
			.then(() => {
				notifications.success($LL.message.removeSuccess());
			})
			.catch((error) => {
				console.error(error);
				notifications.error($LL.message.removeFailed());
			});
	};
	// QueryUserConnection.fetch({ variables: { first: 10 } });
</script>

<SectionHead title="User">
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
				goto('./user/create');
			}}
		>
			<Icon src={Plus} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			goto('./user/create');
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
							Object.keys(selectedRows).forEach((id) => (selectedRows[id] = selectAll));
						}}
					/>
				</label>
			</th>
			<StringTh
				name="name"
				bind:expression={variables.name}
				bind:sort={orderBy.name}
				on:filter={query}
			/>
			<StringTh
				name="login"
				bind:expression={variables.login}
				bind:sort={orderBy.login}
				on:filter={query}
			/>
			<StringTh
				name={'password'}
				bind:expression={variables.password}
				bind:sort={orderBy.password}
				on:filter={query}
			/>
		</tr>
	</thead>
	{#if $QueryUserConnection.isFetching}
		<TableLoading />
	{:else}
		<tbody>
			{#each nodes as node}
				{#if node && node.id}
					<tr class="hover">
						<th class="z-10">
							<label>
								<input type="checkbox" class="checkbox" bind:checked={selectedRows[node.id]} />
							</label>
						</th>
						<StringTd
							id={node.id}
							name="name"
							bind:value={node.name}
							on:save={() => updateField({ id: node?.id, name: node?.name })}
							error={errors[node.id]?.name}
						/>
						<StringTd
							id={node.id}
							name="login"
							bind:value={node.login}
							on:save={() => updateField({ id: node?.id, name: node?.login })}
							error={errors[node.id]?.login}
						/>
						<StringTd
							id={node.id}
							name="password"
							bind:value={node.password}
							on:save={() => updateField({ id: node?.id, name: node?.password })}
							error={errors[node.id]?.password}
						/>
						<td>
							<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
								<button
									class="btn btn-square btn-ghost btn-xs"
									on:click={(e) => {
										e.preventDefault();
										if (node) {
											goto(`./user/${node.id}`);
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
{#if $QueryUserConnection.errors}
	{notifications.error($LL.message.requestFailed())}
{/if}
