<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form } from '@graphace/ui/components/form';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Role, MutationTypeRoleArgs } from '~/lib/types/schema';

	export let node: MutationTypeRoleArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: Errors) => void;
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
		title={$LL.graphql.objects.Role.name()}
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
		<StringItem label={$LL.graphql.objects.Role.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
		<StringItem label={$LL.graphql.objects.Role.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
		<ObjectItem name="users" path="_/users" label={$LL.graphql.objects.Role.fields.users.name()} errors={errors.users} on:gotoField />
		<ObjectItem name="composites" path="_/composites" label={$LL.graphql.objects.Role.fields.composites.name()} errors={errors.composites} on:gotoField />
		<ObjectItem name="permissions" path="_/permissions" label={$LL.graphql.objects.Role.fields.permissions.name()} errors={errors.permissions} on:gotoField />
		<ObjectItem name="apis" path="_/apis" label={$LL.graphql.objects.Role.fields.apis.name()} errors={errors.apis} on:gotoField />
		<ObjectItem name="menus" path="_/menus" label={$LL.graphql.objects.Role.fields.menus.name()} errors={errors.menus} on:gotoField />
		<ObjectItem name="realm" path="_/realm" label={$LL.graphql.objects.Role.fields.realm.name()} errors={errors.realm} on:gotoField />
	</Form>
</Card>