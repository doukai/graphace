import { valueToString } from "./Arguments.js";

export class Directive {
    name: string;
    args?: Record<string, unknown> | undefined;
    constructor(params: { name: string, args?: Record<string, unknown> | undefined }) {
        this.name = params.name;
        this.args = params.args;
    }
    public toString = (): string => {
        return `@${this.name}${this.args ? `(${Object.entries(this.args).filter(([k, v]) => v !== undefined).map(([k, v]) => `${k}: ${valueToString(v)}`).join(', ')})` : ''}`;
    }
}

export const createDirective = (params: any): Directive | undefined => {
    if (params) {
        return new Directive({
            name: params.name,
            args: params.args
        });
    }
}