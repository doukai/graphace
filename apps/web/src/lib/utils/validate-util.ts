import { JsonSchema } from '@graphace/commons';
import { graphql } from '$houdini';

const LoadSchemaByNameQuery = graphql(`
    query LoadSchemaByName($name: String) {
        jsonSchema(name: $name)
    }
`);

class GraphQLJsonSchema extends JsonSchema {
    async loadSchema(name: string) {
        const jsonSchema = (await LoadSchemaByNameQuery.fetch({ variables: { name } })).data?.jsonSchema;
        if (jsonSchema) {
            return JSON.parse(jsonSchema);
        }
        throw new Error('json schema undefined: ' + name);
    }
}

export const { validate, validateSchema, getErrors, getSchemaErrors } = new GraphQLJsonSchema();