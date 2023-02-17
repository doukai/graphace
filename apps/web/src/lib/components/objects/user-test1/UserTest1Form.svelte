<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Form, FormLoading, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { StringItem, TimestampItem, IDItem, BooleanItem, IntItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { UserTest1, MutationTypeUserTest1Args } from '~/lib/types/schema';

	export let node: UserTest1 | null | undefined;
	export let isFetching: boolean = false;
	export let errors: Record<string, Errors> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserTest1Args;
			update?: boolean;
			then: (data: UserTest1 | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				update: true,
				then: (data) => {
					node = data;
					notifications.success($LL.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.saveFailed());
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node.id, isDeprecated: true },
				update: true,
				then: (data) => {
					notifications.success($LL.message.removeSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.removeFailed());
				}
			});
		}
	};
</script>

<Form>
	<FormItems title="UserTest1">
		{#if isFetching}
			<FormLoading rows={11} />
		{:else}
			{#if node}
				<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
				<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
				<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
				<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
				<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
				<IntItem label="test1" name="test1" bind:value={node.test1} errors={errors.test1} />
				<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
				<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
				<IntItem label="userId" name="userId" bind:value={node.userId} errors={errors.userId} />
				<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
			{/if}
		{/if}
	</FormItems>
	<FormButtons>
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				dispatch('back');
			}}
		>
			{$LL.components.graphql.editor.backBtn()}
		</button>
		<button
			class="btn"
			disabled={isFetching}
			on:click={(e) => {
				e.preventDefault();
				save();
			}}
		>
			{$LL.components.graphql.editor.saveBtn()}
		</button>
		<button
			class="btn btn-outline btn-error"
			disabled={isFetching}
			on:click={(e) => {
				e.preventDefault();
				messageBoxs.open({
					title: $LL.components.graphql.table.removeModalTitle(),
					buttonName: $LL.components.graphql.table.removeBtn(),
					buttonType: 'error',
					confirm: () => {
						remove();
						return true;
					}
				});
			}}
		>
			{$LL.components.graphql.editor.removeBtn()}
		</button>
	</FormButtons>
</Form>
