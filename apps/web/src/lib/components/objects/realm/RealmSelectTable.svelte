<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, notifications } from '@graphace/ui';
	import { StringTh, StringTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Realm,
		RealmOrderBy,
		QueryRealmListArgs,
		RealmInput
	} from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let nodes: (Realm | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryRealmListArgs;
			then: (data: (Realm | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: RealmInput;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		select: {
			selected: RealmInput | null | undefined | (RealmInput | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	export let showSelectButton = false;
	export let args: QueryRealmListArgs = {};
	export let orderBy: RealmOrderBy = {};

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
				notifications.error($LL.web.message.requestFailed());
			}
		});
	};

	export const search = (searchValue: string | undefined) => {
		let args: QueryRealmListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
			args.description = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
			args.description = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			}
		});
	};

	const updateField = (args: RealmInput | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					notifications.success($LL.web.message.saveSuccess());
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			});
		}
	}
</script>

<TableHead
	title={$LL.graphql.objects.Realm.name()}
	showCreateButton={false}
	showSaveButton={false}
	showRemoveButton={false}
	{showSelectButton}
	{showBackButton}
	on:search={(e) => search(e.detail.value)}
	on:select={(e) =>
		dispatch('select', {
			selected: Array.isArray(selectedIdList)
				? selectedIdList.flatMap((id) => nodes?.find((node) => node?.id === id)).map((node) => ({ name: node?.name, description: node?.description, where: { id: { val: node?.id } } }))
				: nodes?.filter((node) => node?.id === selectedIdList)?.map((node) => ({ name: node?.name, description: node?.description, where: { id: { val: node?.id } } }))[0],
			then: () => {
				notifications.success($LL.web.message.saveSuccess());
				dispatch('back');
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.saveFailed());
			}
		})}
	on:back
/>
<div class="divider" />
<Table>
	<thead>
		<tr class="z-20">
			<th class="w-12">
				{#if multipleSelect}
					<label>
						<input
							type="checkbox"
							class="checkbox"
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
			{#if permissions.auth('Realm::name::*')}
			<StringTh
				name={$LL.graphql.objects.Realm.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Realm::description::*')}
			<StringTh
				name={$LL.graphql.objects.Realm.fields.description.name()}
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={2 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									{#if multipleSelect}
										<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.id} />
									{:else}
										<input type="radio" class="radio" bind:group={selectedIdList} value={node.id} />
									{/if}
								</label>
							</th>
							{#if permissions.auth('Realm::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } })}
								readonly={!permissions.auth('Realm::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('Realm::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { id: { val: node?.id } } })}
								readonly={!permissions.auth('Realm::description::WRITE')}
								errors={errors[row]?.iterms?.description}
							/>
							{/if}
							<th class="z-10 hover:z-30 w-12">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.selectBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('select', {
														selected: multipleSelect 
																	? [{ name: node?.name, description: node?.description, where: { id: { val: node.id } } }] 
																	: { name: node?.name, description: node?.description, where: { id: { val: node.id } } },
														then: () => {
															notifications.success($LL.web.message.saveSuccess());
															dispatch('back');
														},
														catch: (errors) => {
															console.error(errors);
															notifications.error($LL.web.message.saveFailed());
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
				<TableEmpty cols={2 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
