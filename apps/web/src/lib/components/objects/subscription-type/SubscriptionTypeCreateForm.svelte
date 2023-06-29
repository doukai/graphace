<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Form, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { StringItem, TimestampItem, BooleanItem, IntItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { SubscriptionType, MutationTypeSubscriptionTypeArgs } from '~/lib/types/schema';

	export let node: MutationTypeSubscriptionTypeArgs = {};
	export let errors: Record<string, Errors> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeSubscriptionTypeArgs;
			update?: boolean;
			then: (data: SubscriptionType | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			if (node) {
				dispatch('mutation', {
					args: node,
					then: (data) => {
						notifications.success($LL.message.saveSuccess());
						dispatch('back');
					},
					catch: (errors) => {
						console.error(errors);
						notifications.error($LL.message.saveFailed());
					}
				});
			}
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node., isDeprecated: true },
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
	<FormItems title="SubscriptionType">
		<ObjectItem name="group" path="_/group" label="group" errors={errors.group} on:gotoField />
		<ObjectItem name="groupConnection" path="_/group-connection" label="groupConnection" errors={errors.groupConnection} on:gotoField />
		<ObjectItem name="groupList" path="_/group-list" label="groupList" errors={errors.groupList} on:gotoField />
		<ObjectItem name="groupRole" path="_/group-role" label="groupRole" errors={errors.groupRole} on:gotoField />
		<ObjectItem name="groupRoleConnection" path="_/group-role-connection" label="groupRoleConnection" errors={errors.groupRoleConnection} on:gotoField />
		<ObjectItem name="groupRoleList" path="_/group-role-list" label="groupRoleList" errors={errors.groupRoleList} on:gotoField />
		<ObjectItem name="permission" path="_/permission" label="permission" errors={errors.permission} on:gotoField />
		<ObjectItem name="permissionConnection" path="_/permission-connection" label="permissionConnection" errors={errors.permissionConnection} on:gotoField />
		<ObjectItem name="permissionList" path="_/permission-list" label="permissionList" errors={errors.permissionList} on:gotoField />
		<ObjectItem name="realm" path="_/realm" label="realm" errors={errors.realm} on:gotoField />
		<ObjectItem name="realmConnection" path="_/realm-connection" label="realmConnection" errors={errors.realmConnection} on:gotoField />
		<ObjectItem name="realmList" path="_/realm-list" label="realmList" errors={errors.realmList} on:gotoField />
		<ObjectItem name="role" path="_/role" label="role" errors={errors.role} on:gotoField />
		<ObjectItem name="roleComposite" path="_/role-composite" label="roleComposite" errors={errors.roleComposite} on:gotoField />
		<ObjectItem name="roleCompositeConnection" path="_/role-composite-connection" label="roleCompositeConnection" errors={errors.roleCompositeConnection} on:gotoField />
		<ObjectItem name="roleCompositeList" path="_/role-composite-list" label="roleCompositeList" errors={errors.roleCompositeList} on:gotoField />
		<ObjectItem name="roleConnection" path="_/role-connection" label="roleConnection" errors={errors.roleConnection} on:gotoField />
		<ObjectItem name="roleList" path="_/role-list" label="roleList" errors={errors.roleList} on:gotoField />
		<ObjectItem name="user" path="_/user" label="user" errors={errors.user} on:gotoField />
		<ObjectItem name="userConnection" path="_/user-connection" label="userConnection" errors={errors.userConnection} on:gotoField />
		<ObjectItem name="userGroup" path="_/user-group" label="userGroup" errors={errors.userGroup} on:gotoField />
		<ObjectItem name="userGroupConnection" path="_/user-group-connection" label="userGroupConnection" errors={errors.userGroupConnection} on:gotoField />
		<ObjectItem name="userGroupList" path="_/user-group-list" label="userGroupList" errors={errors.userGroupList} on:gotoField />
		<ObjectItem name="userList" path="_/user-list" label="userList" errors={errors.userList} on:gotoField />
		<ObjectItem name="userRole" path="_/user-role" label="userRole" errors={errors.userRole} on:gotoField />
		<ObjectItem name="userRoleConnection" path="_/user-role-connection" label="userRoleConnection" errors={errors.userRoleConnection} on:gotoField />
		<ObjectItem name="userRoleList" path="_/user-role-list" label="userRoleList" errors={errors.userRoleList} on:gotoField />
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
			on:click={(e) => {
				e.preventDefault();
				save();
			}}
		>
			{$LL.components.graphql.editor.saveBtn()}
		</button>
		<button
			class="btn btn-outline btn-error"
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