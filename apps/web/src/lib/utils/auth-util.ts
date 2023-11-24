import { createPermissions } from '@graphace/commons';
import { graphql } from '$houdini';
import { env } from '$env/dynamic/public';

const CurrentPermissionNameListQuery = graphql(`
    query CurrentPermissionNameListQuery($types: [String]) {
        currentPermissionNameList(types: $types)
    }
`);

export const permissions = createPermissions(
    async (types: string[]) => {
        const response = await CurrentPermissionNameListQuery.fetch({ variables: { types } });
        return response.data?.currentPermissionNameList || [];
    },
    env.PUBLIC_QUERY_TYPE_NAME,
    env.PUBLIC_MUTATION_TYPE_NAME,
    env.PUBLIC_SUBSCRIPTION_TYPE_NAME
);

