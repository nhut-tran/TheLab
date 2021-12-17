import { useFormikContext } from "formik"
import { useEffect } from "react"
import { WorkSheet } from "../api/entity"
import saveData from "../utils/useSave"

interface Props {
    item: string,

}
const AutoSave = ({ item }: Props) => {

    const { values } = useFormikContext<WorkSheet>()

    useEffect(() => {
        saveData(item, values)
    }, [values, item])

    return null
}

export default AutoSave