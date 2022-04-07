import { client } from '$lib/GraphqlClient'
import type { __Type } from '$lib/__Type';
import type { RequestHandler } from '@sveltejs/kit'
import { gql } from 'graphql-request'
import { TypeManager } from '$lib/TypeManager';

type Params = { type: string };
type Data = { __type: __Type };
type Output = { __type: __Type };
const manager = new TypeManager();

export const get: RequestHandler<Params, Output> = async ({ params }) => {
    const typeName = manager.urlToTypeName(params.type)
    const query = gql`
        query ($typeName: String) {
            __type(name:{val: $typeName}){
                name
                kind
                description
                fields{
                    name
                    type{
                        name
                        kind
                        ofType{
                            name
                            kind
                            ofType{
                                name
                                kind
                                ofType{
                                    name
                                    kind
                                }
                            }
                        }
                    }
                    description
                }
            }
        }
    `;

    const variables = { typeName };
    const { __type } = await client.request<Data>(query, variables);

    return {
        status: 200,
        body: {
            __type
        }
    };
}