<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form, FormLoading } from '@graphace/ui/components/form';
	import { StringItem, IntItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Group, GroupInput } from '~/lib/types/schema';

	export let node: Group | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: GroupInput;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: GroupInput | null;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				then: (data) => {
					node = data;
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node.id, isDeprecated: true },
				then: (data) => {
					notifications.success($LL.web.message.removeSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.removeFailed());
				}
			});
		}
	};

	const unbind = (): void => {
		if (node) {
			dispatch('parentMutation', {
				args: null,
				then: (data) => {
					notifications.success($LL.web.message.unbindSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.unbindFailed());
				}
			});
		}
	};
</script>

<Card>
	<Form
		title={$LL.graphql.objects.Group.name()}
		{showRemoveButton}
		{showUnbindButton}
		{showGotoSelectButton}
		{showBackButton}
		on:save={save}
		on:remove={() =>
			messageBoxs.open({
				title: $LL.web.components.table.removeModalTitle(),
				buttonName: $LL.web.components.table.removeBtn(),
				buttonType: 'error',
				confirm: () => {
					remove();
					return true;
				}
			})}
		on:unbind={() =>
			messageBoxs.open({
				title: $LL.web.components.table.unbindModalTitle(),
				buttonName: $LL.web.components.table.unbindBtn(),
				buttonType: 'error',
				confirm: () => {
					unbind();
					return true;
				},
				button1: {
					name: $LL.web.components.table.removeBtn(),
					className: 'btn-error',
					onClick: () => {
						remove();
						return true;
					}
				}
			})}
		on:gotoSelect
		on:back
	>
		{#if isFetching}
			<FormLoading rows={8} />
		{:else}
			{#if node}
				<StringItem label={$LL.graphql.objects.Group.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
				<StringItem label={$LL.graphql.objects.Group.fields.path.name()} name="path" bind:value={node.path} errors={errors.path} />
				<IntItem label={$LL.graphql.objects.Group.fields.deep.name()} name="deep" bind:value={node.deep} errors={errors.deep} />
				<ObjectItem name="parent" path={`${node.id}/parent`} label={$LL.graphql.objects.Group.fields.parent.name()} errors={errors.parent} on:gotoField />
				<ObjectItem name="subGroups" path={`${node.id}/sub-groups`} label={$LL.graphql.objects.Group.fields.subGroups.name()} errors={errors.subGroups} on:gotoField />
				<ObjectItem name="users" path={`${node.id}/users`} label={$LL.graphql.objects.Group.fields.users.name()} errors={errors.users} on:gotoField />
				<ObjectItem name="roles" path={`${node.id}/roles`} label={$LL.graphql.objects.Group.fields.roles.name()} errors={errors.roles} on:gotoField />
				<ObjectItem name="realm" path={`${node.id}/realm`} label={$LL.graphql.objects.Group.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	</Form>
</Card>
