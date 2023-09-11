<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form } from '@graphace/ui/components/form';
	import { StringItem, IntItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Group, MutationTypeGroupArgs } from '~/lib/types/schema';

	export let node: MutationTypeGroupArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeGroupArgs;
			update?: boolean;
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
				args: {},
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
</script>

<Card>
	<Form
		title={$LL.graphql.objects.Group.name()}
		showRemoveButton={showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
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
		on:gotoSelect
		on:back
	>
		<StringItem label={$LL.graphql.objects.Group.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
		<StringItem label={$LL.graphql.objects.Group.fields.path.name()} name="path" bind:value={node.path} errors={errors.path} />
		<IntItem label={$LL.graphql.objects.Group.fields.deep.name()} name="deep" bind:value={node.deep} errors={errors.deep} />
		<ObjectItem name="parent" path="_/parent" label={$LL.graphql.objects.Group.fields.parent.name()} errors={errors.parent} on:gotoField />
		<ObjectItem name="subGroups" path="_/sub-groups" label={$LL.graphql.objects.Group.fields.subGroups.name()} errors={errors.subGroups} on:gotoField />
		<ObjectItem name="users" path="_/users" label={$LL.graphql.objects.Group.fields.users.name()} errors={errors.users} on:gotoField />
		<ObjectItem name="roles" path="_/roles" label={$LL.graphql.objects.Group.fields.roles.name()} errors={errors.roles} on:gotoField />
		<ObjectItem name="realm" path="_/realm" label={$LL.graphql.objects.Group.fields.realm.name()} errors={errors.realm} on:gotoField />
	</Form>
</Card>