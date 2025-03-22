export type Template =
    '{{dataPath}}/pages.json' |
    '{{i18nPath}}/{{i18nDefault}}/graphql/index.ts' |
    '{{i18nPath}}/{{i18nDescription}}/graphql/index.ts' |
    '{{storesPath}}/query/query_{{name}}_store.ts' |
    '{{storesPath}}/query/query_{{name}}_{{objectFieldName}}_store.ts' |
    '{{storesPath}}/mutation/mutation_{{name}}_store.ts' |
    '{{storesPath}}/mutation/mutation_{{name}}_{{objectFieldName}}_store.ts' |
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Form.svelte' |
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Table.svelte' |
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Select.svelte' |
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectFilter.svelte' |
    '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectTd.svelte' |
    '{{componentsPath}}/objects/{{pathName}}/{{name}}Filter.svelte' |
    // '{{componentsPath}}/enums/{{pathName}}/{{name}}Item.svelte' |
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Th.svelte' |
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Td.svelte' |
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Input.svelte' |
    '{{componentsPath}}/enums/{{pathName}}/{{name}}Filter.svelte' |
    '{{componentsPath}}/enums/{{pathName}}/index.ts' |
    '{{routesPath}}/{{pathName}}/+page.svelte' |
    '{{routesPath}}/{{pathName}}/+page.ts' |
    '{{routesPath}}/{{pathName}}/[id]/+page.svelte' |
    '{{routesPath}}/{{pathName}}/[id]/+page.ts' |
    // '{{routesPath}}/{{pathName}}/_/+page.svelte' |
    // '{{routesPath}}/{{pathName}}/_/+page.ts' |
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.svelte' |
    '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/+page.ts' |
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.svelte' |
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/+page.ts' |
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.svelte' |
    '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/_/+page.ts' //|
// '{{componentsPath}}/objects/{{pathName}}/{{name}}ConnectionTable.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}CreateTable.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectTable.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectConnectionTable.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeMenu.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}TreeCard.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}Th.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}SelectItem.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}Agg.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}Bar.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}Line.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}Pie.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}AggTable.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}AggGrid.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/{{name}}Grid.svelte' |
// '{{componentsPath}}/objects/{{pathName}}/index.ts' |
// '{{componentsPath}}/objects/index.ts' |
// '{{componentsPath}}/enums/index.ts' |
// '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.svelte' |
// '{{routesPath}}/{{pathName}}/[id]/{{objectFieldPathName}}/__/+page.ts' |
// '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.svelte' |
// '{{routesPath}}/{{pathName}}/[id]/{{objectListFieldPathName}}/__/+page.ts' |
// '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.svelte' |
// '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/+page.ts' |
// '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.svelte' |
// '{{routesPath}}/{{pathName}}/_/{{objectFieldPathName}}/__/+page.ts' |
// '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.svelte' |
// '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/+page.ts' |
// '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.svelte' |
// '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/_/+page.ts' |
// '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.svelte' |
// '{{routesPath}}/{{pathName}}/_/{{objectListFieldPathName}}/__/+page.ts' |
// '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.svelte' |
// '{{routesPath}}/{{pathName}}/{{chartRoutesPath}}/[type]/+page.ts' |
// '{{routesPath}}/{{pathName}}/{{gridRoutesPath}}/[type]/+page.svelte' |
// '{{routesPath}}/{{pathName}}/{{gridRoutesPath}}/[type]/+page.ts'