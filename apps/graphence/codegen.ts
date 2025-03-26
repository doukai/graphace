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
                maybeValue: 'T | null | undefined',
                scalars: {
                    BigInteger: 'number',
                    BigDecimal: 'number',
                    DateTime: 'string',
                    Date: 'string',
                    Time: 'string',
                    Timestamp: 'string',
                    Upload: 'string',
                },
                enumsAsTypes: true,
                namingConvention: {
                    enumValues: 'change-case-all#upperCase'
                }
            }
        },
        './src/lib/types/introspection.json': {
            plugins: ['introspection'],
            config: {
                minify: false
            }
        },
        './src': {
            preset: 'graphace-codegen-preset',
            plugins: ['graphace-codegen'],
            presetConfig: {
                appName: 'graphence',
                i18nDescription: 'zh',
                useAuth: true,
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
                            name: 'User',
                            select: true,
                            fields: [
                                {
                                    name: 'salt',
                                    ignore: true
                                },
                                {
                                    name: 'hash',
                                    ignore: true
                                },
                                {
                                    name: 'syncUserPolicy',
                                    inQuery: false,
                                    inSubscription: false,
                                    inList: false,
                                    inDetail: false
                                }
                            ]
                        },
                        {
                            name: 'Role',
                            select: true,
                            fields: [
                                {
                                    name: 'users',
                                    select: false
                                },
                                {
                                    name: 'syncRolePolicy',
                                    inQuery: false,
                                    inSubscription: false,
                                    inList: false,
                                    inDetail: false
                                }
                            ]
                        },
                        {
                            name: 'Group',
                            select: true,
                            fields: [
                                {
                                    name: 'syncGroupPolicy',
                                    inQuery: false,
                                    inSubscription: false,
                                    inList: false,
                                    inDetail: false
                                }
                            ]
                        },
                        {
                            name: 'Permission',
                            fields: [
                                {
                                    name: 'roleId',
                                    ignore: true
                                },
                                {
                                    name: 'syncPermissionPolicy',
                                    inQuery: false,
                                    inSubscription: false,
                                    inList: false,
                                    inDetail: false
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