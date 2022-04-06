import { client } from '$lib/GraphqlClient'
import type { __Type } from '$lib/__Type';
import type { RequestHandler } from '@sveltejs/kit'
import { gql } from 'graphql-request'

type Response = { data: Data };
type Data = { __typeList: Array<__Type> };
type Output = { __typeList: Array<__Type> };
export const get: RequestHandler<null, Output> = async () => {
    const query = gql`
        query {
            __typeList(kind: { val: OBJECT }) {
                name
                description
            }
        }
    `;

    const { data } = await client.request<Response>(query);

    return {
        status: 200,
        body: {
            __typeList: data.__typeList
        }
    };
}