import { Operator } from "./index.js";

export type StringExpression = {
    val?: string | null | undefined;
    arr?: (string | null | undefined)[] | null | undefined;
    opr?: Operator | null | undefined;
}