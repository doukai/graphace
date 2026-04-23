import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { buildFields, buildDirectives, type Directive, type GraphQLError, type Field } from '@graphace/graphql';
import type { Event } from '../types/index.js';

export function createGraphQLQueryStore<T, V>(event: Event, url: string | URL, query: (params: QueryParams) => string): GraphQLStore<T, V> {
    const data: Writable<{ isFetching: boolean, response: { data?: T | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (variables?: V | undefined, params?: FetchParams | undefined) => {
        update((data) => ({ ...data, isFetching: true }));

        const response = await event.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query({ fields: buildFields(params?.fields), directives: buildDirectives(params?.directives) }),
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

export async function fetchGraphQLQueryStore<T, V>(event: Event, url: string | URL, query: (params: QueryParams) => string, variables?: V | undefined, params?: FetchParams | undefined): Promise<GraphQLStore<T, V>> {
    const graphQLQueryStore = createGraphQLQueryStore<T, V>(event, url, query);
    await graphQLQueryStore.fetch(variables, params);
    return graphQLQueryStore;
}

export function createGraphQLMutationStore<T, V>(event: Event, url: string | URL, query: (params: QueryParams) => string): GraphQLStore<T, V> {
    const data: Writable<{ isFetching: boolean, response: { data?: T | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (variables?: V | undefined, params?: FetchParams | undefined) => {
        update((data) => ({ ...data, isFetching: true }));

        const { clone, files } = extractFiles(variables);

        if (files.size) {
            const form = new FormData();
            form.set(
                'operations',
                JSON.stringify({
                    query: query({ fields: buildFields(params?.fields), directives: buildDirectives(params?.directives) }),
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
                    query: query({ fields: buildFields(params?.fields), directives: buildDirectives(params?.directives) }),
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

export type FetchParams = { fields?: Field[] | undefined; directives?: Directive[] | undefined };

export type QueryParams = { fields: string; directives: string };

export type GraphQLStore<T, V> = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: T | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: T | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (variables?: V | undefined, params?: FetchParams | undefined) => Promise<{ data?: T | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export function extractFiles(value: any, path = "") {
    if (!arguments.length) {
        throw new TypeError("Argument 1 `value` is required.");
    }

    if (typeof path !== "string") {
        throw new TypeError("Argument 2 `path` must be a string.");
    }

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