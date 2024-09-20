import { writable, get } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import { ChartData } from 'chart.js';
import type { PermissionConnectionQueryArguments } from '~/lib/types/schema';
import LL from '$i18n/i18n-svelte';

export async function createPermissionAggStore(params: { event: LoadEvent, fields: Field[], queryArguments: PermissionConnectionQueryArguments }): Promise<PermissionAggStore> {
    const chartData: Writable<{ isFetching: boolean, data: ChartData<'bar', (number | [number, number])[], unknown> }> = writable({
        isFetching: false,
        data: {
            datasets: []
        }
    });

    const { event, fields, queryArguments } = params;

    let $LL = get(LL);

    const fieldNames: Record<string, () => LocalizedString | Record<string, () => LocalizedString>> = {
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
        rolesAggregate: {
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
    }

    const { subscribe, set, update } = chartData;

    const fetch = async (fields: Field[], queryArguments: PermissionConnectionQueryArguments) => {
        if (fields && fields.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_permissionConnection($name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $orderBy: PermissionOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [PermissionExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    permissionConnection(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId permissionRoleRelation: $permissionRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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

export type PermissionAggStore = {
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