import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { LoadEvent } from '@sveltejs/kit';
import type { Group, Option } from '@graphace/ui';
import { ChartData } from 'chart.js';
import type { FileConnectionQueryArguments } from '~/lib/types/schema';

export async function createFileAggStore(params: { event: LoadEvent, selectColumns: Option[], queryArguments: FileConnectionQueryArguments }): Promise<FileAggStore> {
    const chartData: Writable<{ isFetching: boolean, data: ChartData<'bar', (number | [number, number])[], unknown> }> = writable({
        isFetching: false,
        data: {
            datasets: []
        }
    });

    const { subscribe, set, update } = chartData;

    const fetch = async (selectColumns: Option[], queryArguments: FileConnectionQueryArguments) => {
        if (selectColumns && selectColumns.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_fileConnection($id: StringExpression, $name: StringExpression, $contentType: StringExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $orderBy: FileOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [FileExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    fileConnection(id: $id name: $name contentType: $contentType content: $content url: $url includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
        totalCount
        edges {
            node {
                ${(queryArguments.groupBy || []).join('\r\n')}
                ${selectColumns
                    .reduce((groups, option) => {
                        if (groups.some((group) => group.value === option.group?.value)) {
                            groups.find((group) => group.value === option.group?.value)?.options?.push(option);
                        } else {
                            groups.push({
                                value: option.group?.value,
                                label: option.group?.label,
                                options: [option]
                            });
                        }
                        return groups;
                    }, <Group[]>[])
                    .map((group) => {
                        if (group.value) {
                            return `${group.value} {${group.options?.map((option) => option.value).join('\r\n')}}`;
                        } else {
                            return group.options?.map((option) => option.value).join('\r\n');
                        }
                    })}
            }
        }
    }
}`;

            const response = await params.event.fetch('/graphql', {
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
                            datasets: selectColumns.map((column) => ({
                                label: column.label!,
                                data: nodes.map((node: { [x: string]: any }) => {
                                    if (column.group?.value) {
                                        return node[column.group.value][column.value];
                                    } else {
                                        return node[column.value];
                                    }
                                })
                            }))
                        }
                    });
                }
            }
        }
    }

    await fetch(params.selectColumns, params.queryArguments);

    return {
        subscribe,
        fetch
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
    fetch: (selectColumns: Option[], queryArguments: FileConnectionQueryArguments) => Promise<void>;
}