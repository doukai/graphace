import { valueToString } from "./Arguments.js";
import { createDirective, Directive } from "./Directive.js";

export class Field {
    name: string;
    alias?: string | undefined;
    args?: Record<string, unknown> | undefined;
    parent?: Field | undefined;
    fields?: Field[] | undefined;
    directives?: Directive[] | undefined;
    constructor(params: { name: string, alias?: string | undefined, args?: Record<string, unknown> | undefined, fields?: Field[] | undefined, directives?: Directive[] | undefined }) {
        this.name = params.name;
        this.alias = params.alias;
        this.args = params.args;
        this.fields = params.fields;
        this.directives = params.directives;
    }
    public getDeep = (): number => {
        return this.fields?.reduce((deep, field) => {
            if (field.fields) {
                const subDeep = field.getDeep() + 1;
                if (subDeep > deep) {
                    return subDeep;
                }
            }
            return deep;
        }, 1) || 1
    }
    public toString = (): string => {
        if (this.fields && this.fields.length > 0) {
            return `${this.alias ? this.alias + ':' : ''}${this.name}${this.args && Object.keys(this.args).length > 0 ? `(${Object.entries(this.args).filter(([k, v]) => v !== undefined).map(([k, v]) => `${k}: ${valueToString(v)}`).join(', ')})` : ''}${this.directives?.map(directive => ' ' + directive.toString()) || ''} {
        ${this.fields.map(field => field.toString()).join('\r\n')}
    }`;
        } else {
            return `${this.alias ? this.alias + ':' : ''}${this.name}${this.args && Object.keys(this.args).length > 0 ? `(${Object.entries(this.args).filter(([k, v]) => v !== undefined).map(([k, v]) => `${k}: ${valueToString(v)}`).join(', ')})` : ''}${this.directives?.map(directive => ' ' + directive.toString()) || ''}`;
        }
    }
}

export const createFields = (params: any): Field[] | undefined => {
    if (params) {
        return params.map((field: any) => createField(field));
    }
}

export const createField = (params: any): Field | undefined => {
    if (params) {
        return new Field({
            name: params.name,
            alias: params.alias,
            args: params.args,
            fields: params.fields?.map((field: any) => createField(field)),
            directives: params.directives?.map((directive: any) => createDirective(directive))
        });
    }
}

export const createConnectionField = (params: { name: string, alias?: string | undefined, args?: Record<string, unknown> | undefined, fields?: Field[] | undefined, directives?: Directive[] | undefined }): Field => {
    return new Field({ ...params, fields: [new Field({ name: 'totalCount' }), new Field({ name: 'edges', fields: [new Field({ name: 'node', fields: params.fields })] })] })
}

export const fieldsDeep = (fields: Field[]): number => {
    return fields.reduce((deep, field) => {
        if (field.fields) {
            const subDeep = fieldsDeep(field.fields) + 1;
            if (subDeep > deep) {
                return subDeep;
            }
        }
        return deep;
    }, 1)
}