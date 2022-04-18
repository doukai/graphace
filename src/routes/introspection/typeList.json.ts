import { client } from '$lib/GraphqlClient'
import { gql } from 'graphql-request'
import type { __Type } from '$lib/types/__Type';
import type { RequestHandler } from '@sveltejs/kit'

type Data = { __typeList: Array<__Type> };
type Output = { __typeList: Array<__Type> };

export const get: RequestHandler<null, Output> = async () => {
    const query: string = gql`
        query {
            __typeList(kind: { val: OBJECT }) {
                name
                description
            }
        }
    `;

    const { __typeList } = await client.request<Data>(query);

    return {
        status: 200,
        body: {
            __typeList
        }
    };
}