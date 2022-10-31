import { client } from './GraphqlClient';
import { gql } from 'graphql-request';
import { TypeManager } from '../TypeManager';
import { type __FieldFilter, type Connection, type __Field, type __Type, __TypeKind } from '../types';

const manager: TypeManager = new TypeManager();

export async function queryType(__type: __Type, id: string): Promise<{ data: object }> {
    const queryTypeFieldName: string = manager.getQueryTypeFieldName(__type);
    const idFieldName: string = manager.getIdFieldName(__type);
    const selections: string = manager.fieldsToSelections(__type);

    const graphql: string = gql`
		query ($id: ID) {
			data: ${queryTypeFieldName} (${idFieldName}: {val: $id}){
				${selections}
			}
		}
	`;

    return await client.request<{ data: object }>(graphql, { id })
};

export type QueryParams = {
    __type?: __Type;
    queryValue?: string;
    fieldFilters?: Array<__FieldFilter>;
    pageSize?: number;
    after?: string;
    before?: string;
    offset?: number;
};

export async function queryTypeConnection({
    __type,
    queryValue = null,
    fieldFilters = [],
    pageSize = 10,
    after = null,
    before = null,
    offset = 0
}: QueryParams): Promise<{ connection: Connection }> {
    const fields: Array<__Field> = manager.getScalarFiledList(__type);
    const variables: string = queryValue ? '($queryValue: String)' : '';
    const whereArguments: string = queryValue
        ? manager.getAllSingleTypeFiledQueryArguments(__type)
        : '';
    let pageArguments = '';
    if (after) {
        pageArguments = `after: "${after}" first: ${pageSize}`;
    } else if (before) {
        pageArguments = `before: "${before}" last: ${pageSize}`;
    } else if (offset) {
        pageArguments = `offset: ${offset} first: ${pageSize}`;
    } else {
        pageArguments = `first: ${pageSize}`;
    }

    const filters: Array<string> = fieldFilters
        .filter((__fieldFilter) => __fieldFilter.val != null)
        .map((__fieldFilter) => {
            if (manager.getFieldTypeKind(__fieldFilter.__field.type) === __TypeKind.OBJECT) {
                if (Object.keys(__fieldFilter.val).filter(key => __fieldFilter.val[key].val).length > 0) {
                    return `${__fieldFilter.__field.name}: {${Object.keys(__fieldFilter.val).filter(key => __fieldFilter.val[key].val)
                        .map(key => `${key}: {opr:${__fieldFilter.val[key].opr} val:${JSON.stringify(__fieldFilter.val[key].val)}}`).join(" ")}}`
                } else {
                    return "";
                }
            } else {
                return `${__fieldFilter.__field.name}: {opr:${__fieldFilter.opr} val:${JSON.stringify(__fieldFilter.val)}}`
            }
        });

    const sorts: Array<string> = fieldFilters
        .filter((__fieldFilter) => __fieldFilter.sort != null)
        .map((__fieldFilter) => `${__fieldFilter.__field.name}: ${__fieldFilter.sort}`);

    let queryArguments = '';

    if (whereArguments) {
        queryArguments += ` ${whereArguments}`;
    }

    if (pageArguments) {
        queryArguments += ` ${pageArguments}`;
    }

    if (filters.length > 0) {
        queryArguments += ` ${filters.join(' ')}`;
    }

    if (sorts.length > 0) {
        queryArguments += ` orderBy: {${sorts.join(' ')}}`;
    }

    const queryTypeConnectionFieldName: string = manager.getQueryTypeConnectionFieldName(__type);
    const selections: string = fields.map((field) => field.name).join(' ');
    const query: string = gql`
    query ${variables}{
        connection: ${queryTypeConnectionFieldName} (${queryArguments}){
            totalCount
            edges {
                node {
                    ${selections}
                }
            }
        }
    }
    `;

    return await client.request<{ connection: Connection }>(query, { queryValue });
}

export type QueryMapParams = {
    __parentType: __Type;
    __type: __Type;
    id: string;
    __field: __Field
};

export async function querySubType({
    __parentType,
    __type,
    id,
    __field
}: QueryMapParams): Promise<{ data: object }> {
    const queryTypeFieldName: string = manager.getQueryTypeFieldName(__parentType);
    const idFieldName: string = manager.getIdFieldName(__parentType);
    const subSelections: string = manager.fieldsToSelections(__type);

    const graphql: string = gql`
		query ($id: ID) {
			data: ${queryTypeFieldName} (${idFieldName}: {val: $id}){
				${__field.from}
                ${__field.name} {
                    ${subSelections}
                }
			}
		}
	`;

    return await client.request<{ data: object }>(graphql, { id })
}

export async function querySubTypeConnection({
    __parentType,
    __type,
    id,
    __field
}: QueryMapParams): Promise<{ connection: Connection }> {
    const queryTypeFieldName: string = manager.getQueryTypeFieldName(__parentType);
    const idFieldName: string = manager.getIdFieldName(__parentType);
    const subSelections: string = manager.fieldsToSelections(__type);

    const graphql: string = gql`
		query ($id: ID) {
			connection: ${queryTypeFieldName} (${idFieldName}: {val: $id}){
				${__field.from}
                ${__field.name} {
                    ${subSelections}
                }
			}
		}
	`;

    return await client.request<{ connection: Connection }>(graphql, { id })
}

export async function mutationType(__type: __Type, data: object): Promise<{ data: object }> {
    const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
    const mutationVariables: string = manager.fieldsToMutationVariables(__type);
    const mutationArguments: string = manager.fieldsToMutationArguments(__type);
    const selections: string = manager.fieldsToSelections(__type);

    const mutation: string = gql`
        mutation (${mutationVariables}) {
            data: ${mutationTypeFieldName} (${mutationArguments}) {
                ${selections}
            }
        }	
    `;

    return await client.request<{ data: object }>(mutation, data);
};

export async function updateType(__type: __Type, data: object, ...__fields: [__Field]): Promise<{ data: object }> {
    const idFieldName: string = manager.getIdFieldName(__type);
    const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
    const selections: string = manager.fieldsToSelections(__type);

    const mutation: string = gql`
        mutation ($${idFieldName} : String, ${__fields.map(__field => '$' + __field.name + ': ' + manager.fieldTypeToArgumentType(__field.type))}) {
            data: ${mutationTypeFieldName} (${idFieldName}: $${idFieldName} ${__fields.map(__field => __field.name + ': $' + __field.name)}) @update {
                ${selections}
            }
        }	
    `;

    return await client.request<{ data: object }>(mutation, data);
};

export async function mutationSubType(__type: __Type, __field: __Field, data: object): Promise<{ data: object }> {
    const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
    const mutationVariables: string = manager.fieldsToMutationVariables(__type);
    const mutationArguments: string = manager.fieldsToMutationArguments(__type);
    const selections: string = manager.fieldsToSelections(__type);

    const mutation: string = gql`
        mutation (${mutationVariables} $${__field.name}: ${manager.fieldTypeToArgumentType(__field.type)}) {
            data: ${mutationTypeFieldName} (${mutationArguments} ${__field.name}: $${__field.name}) {
                ${selections}
            }
        }	
    `;

    return await client.request<{ data: object }>(mutation, data);
};

export async function removeType(__type: __Type, id: string): Promise<{ count: number }> {
    const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
    const idFieldName: string = manager.getIdFieldName(__type);

    const mutation: string = gql`
        mutation ($id: String){
            count: ${mutationTypeFieldName} (${idFieldName}: $id isDeprecated: true) @update {
                ${idFieldName}Count
            }
        }	
    `;

    return await client.request<{ count: number }>(mutation, { id });
}

export async function removeTypes(__type: __Type, idList: string[]): Promise<{ count: number }> {
    const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
    const idFieldName: string = manager.getIdFieldName(__type);

    const mutation: string = gql`
        mutation ($idList: [String]){
            count: ${mutationTypeFieldName} (where: {${idFieldName}: {in: $idList}} isDeprecated: true) @update {
                ${idFieldName}Count
            }
        }	
    `;

    return await client.request<{ count: number }>(mutation, { idList });
}