import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type {
    GraphQLError,
    NamedStruct,
    NamedStructExpression,
    TreeStruct,
    TreeStructExpression
} from '@graphace/graphql';
import {
    Operation,
    Field,
    Directive,
} from '@graphace/graphql';

export function createQueryStore<T>(event: LoadEvent | RequestEvent, url: string | URL): OperationStore<T> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (params: { fields: Field[], name?: string | undefined, directives?: Directive[] }) => {
        if (params.fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = new Operation({ operationType: 'query', ...params });

            const response = await event.fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query.toString()
                })
            });

            const json = await response.json();
            set({
                isFetching: false,
                response: json
            });
            return json;
        }
    }

    return {
        subscribe,
        fetch
    };
}

export async function fetchQueryStore<T>(event: LoadEvent | RequestEvent, url: string | URL, params: { fields: Field[], name?: string | undefined, directives?: Directive[] | undefined }): Promise<OperationStore<T>> {
    const queryStore = createQueryStore<T>(event, url);
    await queryStore.fetch(params);
    return queryStore;
}

export function createMutationStore<T>(event: LoadEvent | RequestEvent, url: string | URL): OperationStore<T> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (params: { fields: Field[], name?: string | undefined, directives?: Directive[] | undefined }) => {
        if (params.fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = new Operation({ operationType: 'mutation', ...params });

            const response = await event.fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query.toString()
                })
            });

            const json = await response.json();
            set({
                isFetching: false,
                response: json
            });
            return json;
        }
    }

    return {
        subscribe,
        fetch
    };
}

export type OperationStore<T> = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (params: { fields: Field[], name?: string | undefined, directives?: Directive[] | undefined }) => Promise<{ data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}


export function createGraphQLQueryStore<T, V>(event: LoadEvent | RequestEvent, url: string | URL, query: string): GraphQLStore<T, V> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (variables: V) => {
        update((data) => ({ ...data, isFetching: true }));

        const response = await event.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        });

        const json = await response.json();
        set({
            isFetching: false,
            response: json
        });
        return json;
    }

    return {
        subscribe,
        fetch
    };
}

export async function fetchGraphQLQueryStore<T, V>(event: LoadEvent | RequestEvent, url: string | URL, query: string, variables?: V | undefined): Promise<GraphQLStore<T, V>> {
    const graphQLQueryStore = createGraphQLQueryStore<T, V>(event, url, query);
    await graphQLQueryStore.fetch(variables);
    return graphQLQueryStore;
}

export function createGraphQLMutationStore<T, V>(event: LoadEvent | RequestEvent, url: string | URL, query: string): GraphQLStore<T, V> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (variables: V) => {
        update((data) => ({ ...data, isFetching: true }));

        const { clone, files } = extractFiles(variables);

        if (files.size) {
            const form = new FormData();
            form.set(
                'operations',
                JSON.stringify({
                    query: query,
                    variables: clone
                })
            );
            const map: Record<string, Array<string>> = {};

            let i = 0;
            files.forEach((paths) => {
                map[++i] = paths;
            });
            form.set('map', JSON.stringify(map));

            i = 0;
            files.forEach((paths, file) => {
                form.set(`${++i}`, file as Blob, (file as File).name);
            });

            const response = await event.fetch(url, {
                method: 'POST',
                body: form as any
            });
            const json = await response.json();
            set({
                isFetching: false,
                response: json
            });
            return json;
        } else {
            const response = await event.fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                    variables: variables
                })
            });
            const json = await response.json();
            set({
                isFetching: false,
                response: json
            });
            return json;
        }
    }

    return {
        subscribe,
        fetch
    };
}

export type GraphQLStore<T, V> = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (variables?: V | undefined) => Promise<{ data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export function createNamedQueryStore(event: LoadEvent | RequestEvent, url: string | URL): NamedQueryStore {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, NamedStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (query: { fieldName: string, idName: string }, variables?: NamedStructExpression & { first?: number | undefined } | undefined) => {
        const args = Object.keys(variables).filter(key => ![query.idName, 'name', 'description', 'first'].includes(key));
        const graphql = /* GraphQL */ `query ${query.fieldName}NamedQuery($${query.idName}: StringExpression, $name: StringExpression, $description: StringExpression, $first: Int) {
	${query.fieldName}(${query.idName}: $${query.idName}, name: $name, description: $description, first: $first${args ? ' ,' + args.map(arg => `${arg}: $${arg}`).join(', ') : ''}) {
		${query.idName}
		name
		description
	}
}`;
        update((data) => ({ ...data, isFetching: true }));

        const response = await event.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: graphql,
                variables: variables
            })
        });

        const json = await response.json();
        set({
            isFetching: false,
            response: json
        });
        return json;
    }

    return {
        subscribe,
        fetch
    };
}

export type NamedQueryStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<string, NamedStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<string, NamedStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (query: { fieldName: string, idName: string }, variables?: NamedStructExpression & { first?: number | undefined } | undefined) => Promise<{ data?: Record<string, NamedStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export function createTreeQueryStore(event: LoadEvent | RequestEvent, url: string | URL): TreeQueryStore {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, TreeStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (query: { fieldName: string, idName: string }, variables?: TreeStructExpression & { first?: number | undefined } | undefined) => {
        const args = Object.keys(variables).filter(key => ![query.idName, 'parentId', 'name', 'first'].includes(key));
        const graphql = /* GraphQL */ `query ${query.fieldName}TreeQuery($${query.idName}: StringExpression, $parentId: StringExpression, $name: StringExpression, $first: Int) {
	${query.fieldName}(${query.idName}: $${query.idName}, parentId: $parentId, name: $name, first: $first${args ? ' ,' + args.map(arg => `${arg}: $${arg}`).join(', ') : ''}) {
		${query.idName}
		parentId
		name
	}
}`;
        update((data) => ({ ...data, isFetching: true }));

        const response = await event.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: graphql,
                variables: variables
            })
        });

        const json = await response.json();
        set({
            isFetching: false,
            response: json
        });
        return json;
    }

    return {
        subscribe,
        fetch
    };
}

export type TreeQueryStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<string, TreeStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<string, TreeStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (query: { fieldName: string, idName: string }, variables?: TreeStructExpression & { first?: number | undefined } | undefined) => Promise<{ data?: Record<string, TreeStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export function createStructQueryStores(event: LoadEvent | RequestEvent, url: string | URL): StructQueryStores {
    return {
        namedQueryStore: createNamedQueryStore(event, url),
        treeQueryStore: createTreeQueryStore(event, url)
    }
};

export type StructQueryStores = {
    namedQueryStore: NamedQueryStore,
    treeQueryStore: TreeQueryStore
}

export function extractFiles(value: any, path = "") {
    if (!arguments.length) throw new TypeError("Argument 1 `value` is required.");


    if (typeof path !== "string")
        throw new TypeError("Argument 2 `path` must be a string.");

    const clones = new Map();

    const files = new Map();

    function recurse(value: any, path: string | string[], recursed: Set<any>) {
        if (isExtractableFile(value)) {
            const filePaths = files.get(value);

            filePaths ? filePaths.push(path) : files.set(value, [path]);

            return null;
        }

        const valueIsList =
            Array.isArray(value) ||
            (typeof FileList !== "undefined" && value instanceof FileList);
        const valueIsPlainObject = isPlainObject(value);

        if (valueIsList || valueIsPlainObject) {
            let clone = clones.get(value);

            const uncloned = !clone;

            if (uncloned) {
                clone = valueIsList
                    ? []
                    : // Replicate if the plain object is an `Object` instance.
                    value instanceof (Object)
                        ? {}
                        : Object.create(null);

                clones.set(value, clone);
            }

            if (!recursed.has(value)) {
                const pathPrefix = path ? `${path}.` : "";
                const recursedDeeper = new Set(recursed).add(value);

                if (valueIsList) {
                    let index = 0;

                    for (const item of value) {
                        const itemClone = recurse(
                            item,
                            pathPrefix + index++,
                            recursedDeeper
                        );

                        if (uncloned) clone.push(itemClone);
                    }
                } else
                    for (const key in value) {
                        const propertyClone = recurse(
                            value[key],
                            pathPrefix + key,
                            recursedDeeper
                        );

                        if (uncloned)
                            clone[key] =
                                propertyClone;
                    }
            }

            return clone;
        }

        return value;
    }

    return {
        clone: recurse(value, path, new Set()),
        files,
    };
}

export function isExtractableFile(value: any) {
    return (
        (typeof File !== "undefined" && value instanceof File) ||
        (typeof Blob !== "undefined" && value instanceof Blob)
    );
}

function isPlainObject(value: any) {
    if (typeof value !== 'object' || value === null) {
        return false
    }

    const prototype = Object.getPrototypeOf(value)
    return (
        (prototype === null ||
            prototype === Object.prototype ||
            Object.getPrototypeOf(prototype) === null) &&
        !(Symbol.toStringTag in value) &&
        !(Symbol.iterator in value)
    )
}