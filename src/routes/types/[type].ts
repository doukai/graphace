import { client } from '$lib/GraphqlClient'
import type { __Type } from '$lib/__Type';
import type { RequestHandler } from '@sveltejs/kit'
import { gql } from 'graphql-request'
import { TypeManager } from '$lib/TypeManager';

type Params = { type: string };
type Response = { data: Data };
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
    const { data } = await client.request<Response>(query, variables);

    return {
        status: 200,
        body: {
            __type: data.__type
        }
    };
}