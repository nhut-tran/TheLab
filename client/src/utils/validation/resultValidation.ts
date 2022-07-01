import { WorkSheet } from "../../api/entity";
import { microValidateConfig, ValidateResult } from "./validationConfig";


export const microResultValidate = (worksheet: WorkSheet) => {
    const validateResult: ValidateResult[] = [];

    worksheet.samples.forEach((sample, ind) => {
        sample.paramaters.forEach((p, indP) => {
            if (p.unit === "/25g" || p.unit === "CFU") {
                validateResult.push(microValidateConfig.unitValue[p.unit](p.result, `samples.${ind}.paramaters.${indP}.result`))
            }
        })
    })

    return {
        result: validateResult.every((val) => val.passed), err: validateResult.filter(valRe => {
            if (!valRe.passed) {
                return { err: valRe.position, message: valRe.message };
            }
        })
    };
}

