<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Form, FormLoading, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { StringItem, TimestampItem, IDItem, BooleanItem, IntItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { UserProfile, MutationTypeUserProfileArgs } from '~/lib/types/schema';

	export let node: UserProfile | null | undefined;
	export let isFetching: boolean = false;
	export let errors: Record<string, Error> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserProfileArgs;
			update?: boolean;
			then: (data: UserProfile | null | undefined) => void;
			catch: (error: Error) => void;
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
				catch: (error) => {
					console.error(error);
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
				catch: (error) => {
					console.error(error);
					notifications.error($LL.message.removeFailed());
				}
			});
		}
	};
</script>

<Form>
	<FormItems title="UserProfile">
		{#if isFetching}
			<FormLoading rows={13} />
		{:else}
			{#if node}
				<StringItem label="address" name="address" bind:value={node.address} error={errors.address} />
				<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} error={errors.createGroupId} />
				<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} error={errors.createTime} />
				<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} error={errors.createUserId} />
				<StringItem label="email" name="email" bind:value={node.email} error={errors.email} />
				<IDItem label="id" name="id" bind:value={node.id} error={errors.id} />
				<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} error={errors.isDeprecated} />
				<StringItem label="qq" name="qq" bind:value={node.qq} error={errors.qq} />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} error={errors.realmId} />
				<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} error={errors.updateTime} />
				<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} error={errors.updateUserId} />
				<ObjectItem name="user" path={`${node.id}/user`} label="user" error={errors.user} on:gotoField />
				<StringItem label="userId" name="userId" bind:value={node.userId} error={errors.userId} />
				<IntItem label="version" name="version" bind:value={node.version} error={errors.version} />
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
