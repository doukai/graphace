import { valueToString } from "./Arguments.js";

export class Directive {
    name: string;
    arguments?: Record<string, unknown> | undefined;
    constructor(params: { name: string, arguments?: Record<string, unknown> | undefined }) {
        this.name = params.name;
        this.arguments = params.arguments;
    }
    public toString = (): string => {
        return `@${this.name}${this.arguments ? `(${Object.entries(this.arguments).filter(([k, v]) => v !== undefined).map(([k, v]) => `${k}: ${valueToString(v)}`).join(', ')})` : ''}`;
    }
}