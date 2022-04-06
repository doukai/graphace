import { client } from '$lib/GraphqlClient'
import { gql } from 'graphql-request'

export const get = async req => {
    const typeName = req.params.typeName
    try {
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
        const { posts } = await client.request(query, variables);

        return {
            status: 200,
            body: { posts },
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'There was a server error.' },
        };
    }
}