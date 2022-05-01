import { client } from '$lib/graphql/GraphqlClient';
import { gql } from 'graphql-request';
import type { __Type } from '$lib/types/__Type';
import { TypeManager } from '$lib/TypeManager';
import type { __FieldFilter, Connection, __Field } from '$lib/types';

const manager: TypeManager = new TypeManager();

export async function queryType(__type: __Type, id: string): Promise<{ data: object; }> {
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
    offset = 0,
}: QueryParams): Promise<{ connection: Connection }> {
    const fields: Array<__Field> = manager.getSingleTypeFiledList(__type);
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
        .map(
            (__fieldFilter) =>
                `${__fieldFilter.__field.name}: {opr:${__fieldFilter.opr} val:${manager.getFieldTypeName(__fieldFilter.__field.type) === 'ID' ||
                    manager.getFieldTypeName(__fieldFilter.__field.type) === 'String'
                    ? '"' + __fieldFilter.val + '"'
                    : __fieldFilter.val
                }}`
        );

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

export async function mutationType(__type: __Type, data: object): Promise<{ data: object; }> {
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

export async function mutationField(__type: __Type, id: string, __field: __Field, value: string | number | boolean | null): Promise<{ data: object; }> {
    const selections: string = manager.fieldsToSelections(__type);
    const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
    const idFieldName = manager.getIdFieldName(__type);
    const fieldTypeName = manager.getFieldTypeName(__field.type);

    const mutation: string = gql`
        mutation ($${idFieldName}: String $${__field.name}: ${fieldTypeName}) {
            data: ${mutationTypeFieldName} (${idFieldName}: $${idFieldName} ${__field.name}: $${__field.name}) @update {
                ${selections}
            }
        }	
    `;

    const variables: object = {};
    variables[idFieldName] = id;
    variables[__field.name] = value;

    return await client.request<{ data: object }>(mutation, variables);
}

export async function removeType(__type: __Type, id: string): Promise<{ count: number; }> {
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

export async function removeTypes(__type: __Type, idList: string[]): Promise<{ count: number; }> {
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