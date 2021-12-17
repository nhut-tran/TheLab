import { FormikContextType, useFormikContext } from "formik"
import { ReactElement } from "react"
import { WorkSheet } from "../api/entity"


interface Props {
    children: (state: FormikContextType<WorkSheet>) => ReactElement,
}

export const ControllFormButton = ({ children }: Props) => {
    const state = useFormikContext<WorkSheet>()

    return children(state)

}

export default ControllFormButton
