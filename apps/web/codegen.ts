import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config';

const config: CodegenConfig = {
    schema: {
        [process.env.PUBLIC_GRAPHQL_URL]: {
            headers: {
                'content-type': 'application/json',
                Authorization: `${process.env.AUTH_SCHEME} ${Buffer.from(process.env.AUTH_TOKEN).toString('base64')}`
            }
        }
    },
    config: {
        sort: false
    },
    overwrite: true,
    generates: {
        './src/lib/types/schema.ts': {
            plugins: ['typescript'],
            config: {
                enumsAsTypes: true,
                namingConvention: {
                    enumValues: 'change-case-all#upperCase'
                }
            }
        },
        './src': {
            preset: 'graphace-codegen-preset',
            plugins: ['graphace-codegen'],
            presetConfig: {
                builder: {
                    objects: [
                        {
                            name: 'any',
                            fields: [
                                {
                                    name: 'id',
                                    inList: false,
                                    inDetail: false
                                },
                                {
                                    name: 'isDeprecated',
                                    inList: false,
                                    inDetail: false
                                },
                                {
                                    name: 'version',
                                    inList: false,
                                    inDetail: false
                                },
                                {
                                    name: 'realmId',
                                    inList: false,
                                    inDetail: false
                                },
                                {
                                    name: 'createUserId',
                                    inList: false,
                                    inDetail: false
                                },
                                {
                                    name: 'createTime',
                                    inList: false,
                                    inDetail: false
                                },
                                {
                                    name: 'updateUserId',
                                    inList: false,
                                    inDetail: false
                                },
                                {
                                    name: 'updateTime',
                                    inList: false,
                                    inDetail: false
                                },
                                {
                                    name: 'createGroupId',
                                    inList: false,
                                    inDetail: false
                                }
                            ]
                        },
                        {
                            name: 'UserGroup',
                            ignore: true
                        },
                        {
                            name: 'UserRole',
                            ignore: true
                        },
                        {
                            name: 'RoleComposite',
                            ignore: true
                        },
                        {
                            name: 'RoleApi',
                            ignore: true
                        },
                        {
                            name: 'RoleMenu',
                            ignore: true
                        },
                        {
                            name: 'GroupRole',
                            ignore: true
                        },
                        {
                            name: 'User',
                            fields: [
                                {
                                    name: 'password',
                                    ignore: true
                                }
                            ]
                        },
                        {
                            name: 'UserPhones',
                            ignore: true
                        },
                        {
                            name: 'Group',
                            fields: [
                                {
                                    name: 'parentId',
                                    ignore: true
                                }
                            ]
                        },
                        {
                            name: 'Permission',
                            fields: [
                                {
                                    name: 'roleId',
                                    ignore: true
                                }
                            ]
                        },
                        {
                            name: 'Api',
                            fields: [
                                {
                                    name: 'roleId',
                                    ignore: true
                                }
                            ]
                        },
                        {
                            name: 'Menu',
                            fields: [
                                {
                                    name: 'parentId',
                                    ignore: true
                                },
                                {
                                    name: 'roleId',
                                    ignore: true
                                }
                            ]
                        }
                    ]
                }
            }

        }
    }
}
export default config