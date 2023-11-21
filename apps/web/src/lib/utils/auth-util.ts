import { Query_currentPermissionNameListStore } from '$houdini';
import { createPermissions } from '@graphace/commons';

const Query_currentPermissionNameList = new Query_currentPermissionNameListStore();
export const permissions = createPermissions(
    async (types: string[]) => {
        const response = await Query_currentPermissionNameList.fetch({ variables: { types } });
        return response.data?.currentPermissionNameList?.map(name => name || '') || [];
    }
);

