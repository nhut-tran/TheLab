import { Method } from "../api/entity";
import { getIn } from "formik";
import { Select } from "../App/structure/FormElement";
import styled from "styled-components";
interface Props {
    methods: Method[],
    department: string,
    fieldErr: string,
    identifier: string,
    className: string
}



const SelectMethod = ({ methods, department, fieldErr, identifier, className }: Props) => {

    const sortMethodByDept = (deptID: string, methodList: Method[]) => {
        if (!deptID) return methodList;
        return methodList.filter((med) => med.departmentID === deptID);
    }

    return (
        <div className={className}>
            <h3>{department}</h3>
            <Select className='form_group' key={identifier} name={identifier} >
                <option hidden >---Select Method----</option>
                {sortMethodByDept(department, methods).map((med, i) => {
                    return <option key={med.methodID} value={med.methodID}>{med.name}</option>
                })}

            </Select>
        </div >
    )



}

export const StyleSelectMethod = styled.div`
   
        display: flex;
        justify-content: center
    
`
export default SelectMethod