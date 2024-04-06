import { createPermissions } from '@graphace/commons';
import { graphql } from '$houdini';
import { env } from '$env/dynamic/public';

const CurrentPermissionNameListByTypesQuery = graphql(`
    query CurrentPermissionNameListByTypesQuery($types: [String]) {
        currentPermissionNameListByTypes(types: $types)
    }
`);

export const permissions = createPermissions(
    async (types: string[]) => {
        const response = await CurrentPermissionNameListByTypesQuery.fetch({ variables: { types } });
        return response.data?.currentPermissionNameListByTypes || [];
    },
    env.PUBLIC_QUERY_TYPE_NAME,
    env.PUBLIC_MUTATION_TYPE_NAME,
    env.PUBLIC_SUBSCRIPTION_TYPE_NAME
);

