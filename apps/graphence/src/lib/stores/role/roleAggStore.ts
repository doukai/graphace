import { writable, get } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import { ChartData } from 'chart.js';
import type { RoleConnectionQueryArguments } from '~/lib/types/schema';
import LL from '$i18n/i18n-svelte';

export async function createRoleAggStore(params: { event: LoadEvent, fields: Field[], queryArguments: RoleConnectionQueryArguments }): Promise<RoleAggStore> {
    const chartData: Writable<{ isFetching: boolean, data: ChartData<'bar', (number | [number, number])[], unknown> }> = writable({
        isFetching: false,
        data: {
            datasets: []
        }
    });

    const { event, fields, queryArguments } = params;

    let $LL = get(LL);

    const fieldNames: Record<string, () => LocalizedString | Record<string, () => LocalizedString>> = {
        nameCount: $LL.graphql.objects.Role.fields.nameCount.name,
        nameMax: $LL.graphql.objects.Role.fields.nameMax.name,
        nameMin: $LL.graphql.objects.Role.fields.nameMin.name,
        descriptionCount: $LL.graphql.objects.Role.fields.descriptionCount.name,
        descriptionMax: $LL.graphql.objects.Role.fields.descriptionMax.name,
        descriptionMin: $LL.graphql.objects.Role.fields.descriptionMin.name,
        usersAggregate: {
            idCount: $LL.graphql.objects.User.fields.idCount.name,
            idMax: $LL.graphql.objects.User.fields.idMax.name,
            idMin: $LL.graphql.objects.User.fields.idMin.name,
            nameCount: $LL.graphql.objects.User.fields.nameCount.name,
            nameMax: $LL.graphql.objects.User.fields.nameMax.name,
            nameMin: $LL.graphql.objects.User.fields.nameMin.name,
            descriptionCount: $LL.graphql.objects.User.fields.descriptionCount.name,
            descriptionMax: $LL.graphql.objects.User.fields.descriptionMax.name,
            descriptionMin: $LL.graphql.objects.User.fields.descriptionMin.name,
            lastNameCount: $LL.graphql.objects.User.fields.lastNameCount.name,
            lastNameMax: $LL.graphql.objects.User.fields.lastNameMax.name,
            lastNameMin: $LL.graphql.objects.User.fields.lastNameMin.name,
            loginCount: $LL.graphql.objects.User.fields.loginCount.name,
            loginMax: $LL.graphql.objects.User.fields.loginMax.name,
            loginMin: $LL.graphql.objects.User.fields.loginMin.name,
            saltCount: $LL.graphql.objects.User.fields.saltCount.name,
            saltMax: $LL.graphql.objects.User.fields.saltMax.name,
            saltMin: $LL.graphql.objects.User.fields.saltMin.name,
            hashCount: $LL.graphql.objects.User.fields.hashCount.name,
            hashMax: $LL.graphql.objects.User.fields.hashMax.name,
            hashMin: $LL.graphql.objects.User.fields.hashMin.name,
            emailCount: $LL.graphql.objects.User.fields.emailCount.name,
            emailMax: $LL.graphql.objects.User.fields.emailMax.name,
            emailMin: $LL.graphql.objects.User.fields.emailMin.name,
        },
        groupsAggregate: {
            idCount: $LL.graphql.objects.Group.fields.idCount.name,
            idMax: $LL.graphql.objects.Group.fields.idMax.name,
            idMin: $LL.graphql.objects.Group.fields.idMin.name,
            nameCount: $LL.graphql.objects.Group.fields.nameCount.name,
            nameMax: $LL.graphql.objects.Group.fields.nameMax.name,
            nameMin: $LL.graphql.objects.Group.fields.nameMin.name,
            descriptionCount: $LL.graphql.objects.Group.fields.descriptionCount.name,
            descriptionMax: $LL.graphql.objects.Group.fields.descriptionMax.name,
            descriptionMin: $LL.graphql.objects.Group.fields.descriptionMin.name,
            pathCount: $LL.graphql.objects.Group.fields.pathCount.name,
            pathMax: $LL.graphql.objects.Group.fields.pathMax.name,
            pathMin: $LL.graphql.objects.Group.fields.pathMin.name,
            parentIdCount: $LL.graphql.objects.Group.fields.parentIdCount.name,
            parentIdMax: $LL.graphql.objects.Group.fields.parentIdMax.name,
            parentIdMin: $LL.graphql.objects.Group.fields.parentIdMin.name,
            deepCount: $LL.graphql.objects.Group.fields.deepCount.name,
            deepSum: $LL.graphql.objects.Group.fields.deepSum.name,
            deepAvg: $LL.graphql.objects.Group.fields.deepAvg.name,
            deepMax: $LL.graphql.objects.Group.fields.deepMax.name,
            deepMin: $LL.graphql.objects.Group.fields.deepMin.name,
        },
        compositesAggregate: {
            idCount: $LL.graphql.objects.Role.fields.idCount.name,
            idMax: $LL.graphql.objects.Role.fields.idMax.name,
            idMin: $LL.graphql.objects.Role.fields.idMin.name,
            nameCount: $LL.graphql.objects.Role.fields.nameCount.name,
            nameMax: $LL.graphql.objects.Role.fields.nameMax.name,
            nameMin: $LL.graphql.objects.Role.fields.nameMin.name,
            descriptionCount: $LL.graphql.objects.Role.fields.descriptionCount.name,
            descriptionMax: $LL.graphql.objects.Role.fields.descriptionMax.name,
            descriptionMin: $LL.graphql.objects.Role.fields.descriptionMin.name,
        },
        permissionsAggregate: {
            nameCount: $LL.graphql.objects.Permission.fields.nameCount.name,
            nameMax: $LL.graphql.objects.Permission.fields.nameMax.name,
            nameMin: $LL.graphql.objects.Permission.fields.nameMin.name,
            descriptionCount: $LL.graphql.objects.Permission.fields.descriptionCount.name,
            descriptionMax: $LL.graphql.objects.Permission.fields.descriptionMax.name,
            descriptionMin: $LL.graphql.objects.Permission.fields.descriptionMin.name,
            fieldCount: $LL.graphql.objects.Permission.fields.fieldCount.name,
            fieldMax: $LL.graphql.objects.Permission.fields.fieldMax.name,
            fieldMin: $LL.graphql.objects.Permission.fields.fieldMin.name,
            typeCount: $LL.graphql.objects.Permission.fields.typeCount.name,
            typeMax: $LL.graphql.objects.Permission.fields.typeMax.name,
            typeMin: $LL.graphql.objects.Permission.fields.typeMin.name,
        },
    }

    const { subscribe, set, update } = chartData;

    const fetch = async (fields: Field[], queryArguments: RoleConnectionQueryArguments) => {
        if (fields && fields.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_roleConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $orderBy: RoleOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RoleExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    roleConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
        totalCount
        edges {
            node {
                ${(queryArguments.groupBy || []).join('\r\n')}
                ${fields.map((field) => fieldToString(field)).join('\r\n')}
            }
        }
    }
}`;

            const response = await event.fetch('/graphql', {
                method: 'POST',
                body: JSON.stringify({
                    query: query,
                    variables: queryArguments
                })
            });

            if (response.ok) {
                const json = await response.json();
                if (queryArguments.groupBy) {
                    const nodes = json.data.userConnection.edges.map((edge: { node: any }) => edge.node);
                    set({
                        isFetching: false,
                        data: {
                            labels: nodes.map((node: { [x: string]: any }) =>
                                queryArguments.groupBy?.map((column) => node[column]).join(' - ')
                            ),
                            datasets: fields.flatMap((field) => {
                                if (field.fields && field.fields.length > 0) {
                                    return field.fields.map(subField => ({
                                        label: getFieldName(field.name, subField.name),
                                        data: nodes.map((node: { [x: string]: any }) => node[field.name][subField.name])
                                    }));
                                } else {
                                    return [{
                                        label: getFieldName(field.name),
                                        data: nodes.map((node: { [x: string]: any }) => node[field.name])
                                    }];
                                }
                            })
                        }
                    });
                }
            }
        }
    }

    const getFieldName = (fieldName: string, subFieldName?: string): string | undefined => {
        if (subFieldName && typeof fieldNames[fieldName] !== 'string') {
            return fieldNames[fieldName][subFieldName]();
        } else if (typeof fieldNames[fieldName] === 'string') {
            return fieldNames[fieldName]();
        }
    }

    await fetch(fields, queryArguments);

    return {
        subscribe,
        fetch,
        getFieldName
    };
}

export type RoleAggStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        data: ChartData<"bar", (number | [number, number])[], unknown>;
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        data: ChartData<"bar", (number | [number, number])[], unknown>;
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], queryArguments: UserConnectionQueryArguments) => Promise<void>;
    getFieldName: (fieldName: string, subFieldName?: string) => string | undefined
}