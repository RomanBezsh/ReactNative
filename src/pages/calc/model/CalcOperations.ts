export const CalcOperations = {
    add: "add",
    sub: "sub",
    div: "div",
    mul: "mul",
    sqr: "sqr",
    sqrt: "sqrt",
    sin: "sin",
    cos: "cos",
    tan: "tan",
    ctg: "ctg",
    percent: "percent",
} as const;

export type CalcOperations = typeof CalcOperations[keyof typeof CalcOperations];