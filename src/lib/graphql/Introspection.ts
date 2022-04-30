import { client } from '$lib/graphql/GraphqlClient';
import { gql } from 'graphql-request';
import type { __Type } from '$lib/types';

export async function getTypeList(): Promise<{ __typeList: Array<__Type>; }> {
    const query: string = gql`
        query {
            __typeList(kind: { val: OBJECT }) {
                name
                description
            }
        }
    `;

    return await client.request<{ __typeList: Array<__Type> }>(query);
}

export async function getType(typeName: string): Promise<{ __type: __Type; }> {
    const query: string = gql`
        query ($typeName: String) {
            __type(name: { val: $typeName }) {
                name
                kind
                description
                fields {
                    name
                    type {
                        name
                        kind
                        ofType {
                            name
                            kind
                            ofType {
                                name
                                kind
                                ofType {
                                    name
                                    kind
                                    enumValues{
                                        name
                                    }
                                }
                                enumValues{
                                    name
                                }
                            }
                            enumValues{
                                name
                            }
                        }
                        enumValues{
                            name
                        }
                    }
                    description
                }
            }
        }
    `;

    const variables = { typeName };
    return await client.request<{ __type: __Type }>(query, variables);
}