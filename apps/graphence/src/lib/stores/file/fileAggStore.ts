import { writable, get } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import { ChartData } from 'chart.js';
import type { FileConnectionQueryArguments } from '~/lib/types/schema';
import LL from '$i18n/i18n-svelte';

export async function createFileAggStore(params: { event: LoadEvent, fields: Field[], queryArguments: FileConnectionQueryArguments }): Promise<FileAggStore> {
    const chartData: Writable<{ isFetching: boolean, data: ChartData<'bar', (number | [number, number])[], unknown> }> = writable({
        isFetching: false,
        data: {
            datasets: []
        }
    });

    const { event, fields, queryArguments } = params;

    let $LL = get(LL);

    const fieldNames: Record<string, () => LocalizedString | Record<string, () => LocalizedString>> = {
        nameCount: $LL.graphql.objects.File.fields.nameCount.name,
        nameMax: $LL.graphql.objects.File.fields.nameMax.name,
        nameMin: $LL.graphql.objects.File.fields.nameMin.name,
        contentTypeCount: $LL.graphql.objects.File.fields.contentTypeCount.name,
        contentTypeMax: $LL.graphql.objects.File.fields.contentTypeMax.name,
        contentTypeMin: $LL.graphql.objects.File.fields.contentTypeMin.name,
        contentCount: $LL.graphql.objects.File.fields.contentCount.name,
        contentMax: $LL.graphql.objects.File.fields.contentMax.name,
        contentMin: $LL.graphql.objects.File.fields.contentMin.name,
        urlCount: $LL.graphql.objects.File.fields.urlCount.name,
        urlMax: $LL.graphql.objects.File.fields.urlMax.name,
        urlMin: $LL.graphql.objects.File.fields.urlMin.name,
    }

    const { subscribe, set, update } = chartData;

    const fetch = async (fields: Field[], queryArguments: FileConnectionQueryArguments) => {
        if (fields && fields.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_fileConnection($id: StringExpression, $name: StringExpression, $contentType: StringExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $orderBy: FileOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [FileExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    fileConnection(id: $id name: $name contentType: $contentType content: $content url: $url includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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

export type FileAggStore = {
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