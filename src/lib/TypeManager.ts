import * as _ from "lodash";

export interface __Type {
    name: string;
    fields: __Field[];
    kind: __TypeKind;
    ofType: __Type;
    description: string;
}

export interface __Field {
    name: string;
    type: __Type;
}

export enum __TypeKind {
    SCALAR = "SCALAR",
    OBJECT = "OBJECT",
    INTERFACE = "INTERFACE",
    UNION = "UNION",
    ENUM = "ENUM",
    INPUT_OBJECT = "INPUT_OBJECT",
    LIST = "LIST",
    NON_NULL = "NON_NULL",
}

export class TypeManager {

    public getFieldType(type: __Type): __TypeKind {
        if (type.kind === __TypeKind.NON_NULL) {
            return this.getFieldType(type.ofType);
        } else if (type.kind === __TypeKind.LIST) {
            return this.getFieldType(type.ofType);
        } else {
            return type.kind;
        }
    }

    public fieldIsList(type: __Type): boolean {

        if (type.kind === __TypeKind.NON_NULL) {
            return this.fieldIsList(type.ofType);
        } else if (type.kind === __TypeKind.LIST) {
            return true;
        } else {
            return false;
        }
    }

    public getFieldTypeName(type: __Type): string {
        if (type.kind === __TypeKind.NON_NULL) {
            return this.getFieldTypeName(type.ofType);
        } else if (type.kind === __TypeKind.LIST) {
            return this.getFieldTypeName(type.ofType);
        } else {
            return type.name;
        }
    }

    public createTypeObject(type: __Type): object {
        let typeObject = {};
        type.fields.forEach(field => typeObject[field.name] = null);
        return typeObject;
    }

    public getIdFieldName(fields: __Field[]): string {
        return fields.find(field => this.getFieldTypeName(field.type) === "ID").name;
    }

    public getQueryTypeListFieldName(typeName: string): string {
        if (typeName.startsWith("__")) {
            return "__" + _.camelCase(typeName.replace("__", "")) + "List";
        } else {
            return _.camelCase(typeName) + "List";
        }
    }

    public getQueryTypeFieldName(typeName: string): string {
        if (typeName.startsWith("__")) {
            return "__" + _.camelCase(typeName.replace("__", ""));
        } else {
            return _.camelCase(typeName);
        }
    }

    public getMutationTypeFieldName(typeName: string): string {
        if (typeName.startsWith("__")) {
            return "__" + _.camelCase(typeName.replace("__", ""));
        } else {
            return _.camelCase(typeName);
        }
    }

    public fieldsToMutationVariables(__type: __Type): string {
        return __type.fields
            .filter(
                (field) =>
                    !this.fieldIsList(field.type) && this.getFieldType(field.type) !== __TypeKind.OBJECT
            )
            .map(field => `$${field.name}: ${this.fieldTypeToArgumentType(field.type)}`)
            .join(",");
    }

    public fieldsToMutationArguments(__type: __Type): string {
        return __type.fields
            .filter(
                (field) =>
                    !this.fieldIsList(field.type) && this.getFieldType(field.type) !== __TypeKind.OBJECT
            )
            .map(field => `${field.name}: $${field.name}`)
            .join(",");
    }

    public fieldsToSelections(__type: __Type): string {
        return __type.fields
            .filter(
                (field) =>
                    !this.fieldIsList(field.type) && this.getFieldType(field.type) !== __TypeKind.OBJECT
            )
            .map((field) => field.name)
            .join(' ');
    }

    private fieldTypeToArgumentType(__type: __Type): string {
        if (this.getFieldType(__type) === __TypeKind.OBJECT) {
            const fieldTypeName = this.getFieldTypeName(__type);
            return __type.name.replace(fieldTypeName, fieldTypeName + 'Input');
        } else {
            return __type.name;
        }
    }

    public typeNameToUrl(typeName: string): string {
        if (typeName.startsWith("__")) {
            return "__" + _.kebabCase(typeName.replace("__", ""));
        } else {
            return _.kebabCase(typeName);
        }
    }

    public urlToTypeName(typeName: string): string {
        if (typeName.startsWith("__")) {
            return "__" + _.camelCase(typeName.replace("__", ""));
        } else {
            return _.camelCase(typeName);
        }
    }
}