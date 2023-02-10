import { Templates } from 'graphace-codegen-commons/types'
import { buildEngine } from 'graphace-codegen-commons'

const engine = buildEngine();

export const templates: Templates = {
    '{{graphqlPath}}/queries/Query_{{name}}.gql': function (graphqlPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{graphqlPath}}/queries/Query_{{name}}_{{objectFieldName}}.gql.gql': function (graphqlPath: string, ame: string, objectFieldName: string): string {
        throw new Error('Function not implemented.');
    },
    '{{graphqlPath}}/mutations/Mutation_{{name}}.gql': function (graphqlPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{graphqlPath}}/mutations/Mutation_{{name}}_{{objectFieldName}}.gql': function (graphqlPath: string, name: string, objectFieldName: string): string {
        throw new Error('Function not implemented.');
    },
    '{{componentsPath}}/menu/objectsMenu.svelte': function (componentsPath: string): string {
        throw new Error('Function not implemented.');
    },
    '{{componentsPath}}/objects/{{name}}Form.svelte': function (componentsPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{componentsPath}}/objects/{{name}}CreateForm.svelte': function (componentsPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{componentsPath}}/objects/{{name}}Table.svelte': function (componentsPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{componentsPath}}/objects/{{name}}ConnectionTable.svelte': function (componentsPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{componentsPath}}/enums/{{name}}Item.svelte': function (componentsPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{componentsPath}}/enums/{{name}}Td.svelte': function (componentsPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{componentsPath}}/enums/{{name}}Th.svelte': function (componentsPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/+page.svelte': function (routesPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/+page.ts': function (routesPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/[id]/+page.svelte': function (routesPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/[id]/+page.ts': function (routesPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/[id]/{{objectFieldName}}/+page.svelte': function (routesPath: string, name: string, objectFieldName: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/[id]/{{objectFieldName}}/+page.ts': function (routesPath: string, name: string, objectFieldName: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/[id]/{{objectListFieldName}}/+page.svelte': function (routesPath: string, name: string, objectListFieldName: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/[id]/{{objectListFieldName}}/+page.ts': function (routesPath: string, name: string, objectListFieldName: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/_/+page.svelte': function (routesPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/_/+page.ts': function (routesPath: string, name: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/_/{{objectFieldName}}/+page.svelte': function (routesPath: string, name: string, objectFieldName: string): string {
        throw new Error('Function not implemented.');
    },
    '{{routesPath}}/[lang]/{{name}}/_/{{objectFieldName}}/+page.ts': function (routesPath: string, name: string, objectFieldName: string): string {
        throw new Error('Function not implemented.');
    }
}