import { Sample } from "../../api/entity"

export interface ValidateResult {
    passed: boolean,
    message: string,
    position: string,
}
type TpcEnterobacteriaceColiform = {
    "ISO-4831": number,
    "ISO-4232": number,
    "ISO-34322": number,

}

type MethodOrderValue<T> = {
    [Property in keyof T]: number;
}

function resultInOrder<T>(sample: Sample, order: (keyof TpcEnterobacteriaceColiform)[]) {

    const extract: MethodOrderValue<T>[] = []
    const val = {} as MethodOrderValue<T>;
    sample.paramaters.forEach((p) => {
        const methodName = p.method as keyof typeof val;
        val[methodName] = parseInt(p.result);
        extract.push(val);
    })
    //swap the property and value of object
    const invertVal = Object.fromEntries(Object.entries(val).map(a => a.reverse()))
    /*
    get array of values and reverse it
    Then using the invert object to get a new array i order base on the valaue
    */
    const arrayVal = Object.values(val) as number[];
    const arrayMethodInOrder = arrayVal.sort((a, b) => { return a - b }).map(v => {
        if (invertVal[v]) {
            return invertVal[v];
        }
    });
    return arrayMethodInOrder.map((v, ind) => v === order[ind]).every(v => v)


}
export const microValidateConfig = {
    unitValue: {
        "/25g": (val: string, position: string): ValidateResult => {
            return { passed: ["not detected", "detected"].includes(val), message: "result and unit not matched", position }
        },
        "CFU": (val: string, position: string) => {
            return { passed: !isNaN(parseInt(val)), message: "result and unit not matched", position }

        }
    },

    meaningFulResult: {
        resultInOrder
    }
}