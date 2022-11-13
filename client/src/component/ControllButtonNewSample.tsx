import ControllFormButton from "./ControlFormButton"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import VerifyIcon from '@mui/icons-material/CheckCircleOutline';
import UnverifyIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import PrintIcon from '@mui/icons-material/Print';
import AllListIcon from '@mui/icons-material/FormatListBulleted';
import GetDataIcon from '@mui/icons-material/GetApp';
import styled from "styled-components";
import { microResultValidate } from "../utils/validation/resultValidation";

interface Props {
    onClick: () => void,

}
interface VerifyButtonProps {
    onClick: () => void,
    isVerify: boolean
}
interface PrintButtonProps {
    onClickPrint: () => void,
    onClickUpdate: () => void,
    onClickDelete: () => void
}
interface ManagerVerifyButtonProps {
    onClickVerify: () => void,
    onClickAllparamater: () => void,
    onClickCheckNewData: () => void,
    isVerify: boolean,
    isCheckNewData: boolean
    isDisplayVerify: boolean

}

interface Prop {
    name: string
}

const StyleControllButtonIcon = styled.div<Prop>`
    
    font-size: 3rem;
    position: relative;
    width: 4rem;
    height:4rem ;
    border-radius: 50rem;
    margin-bottom: 3rem;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    & span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height:100% ;
        color: #FFFF;
        
    }
    & span::after {
        display: none;
        opacity: 0;
        content:" ${props => props.name}";
        font-size: 1rem;
        color: #FFFF;
        position: absolute;
        top: 0%;
        right: 100%;
        width: max-content;
        background-color: rgba(34, 42, 69, 0.692);
        padding: 0.7rem 1.4rem;
        border-radius: 2px;
        transition: all 5s ease-in-out;
       
        }
    &:hover {
        background-color: rgb(212, 207, 207);
      
        & span::after {
            display: inline;
            opacity: 1;
           
        }
    }
`

const AddSample = ({ onClick }: Props) => {
    return (

        <StyleControllButtonIcon name="Add sample" onClick={onClick}><span><AddIcon fontSize="inherit" /></span></StyleControllButtonIcon>

    )
}
const RemoveSample = ({ onClick }: Props) => {
    return (

        <StyleControllButtonIcon name="Remove sample" onClick={onClick}><span><RemoveIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}
const SaveSample = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="Save" onClick={onClick}><span><SaveIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}

const VerifyWorkSheet = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="Verify" onClick={onClick}><span><VerifyIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}
const UnVerifyWorkSheet = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="UnVerify" onClick={onClick}><span><UnverifyIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}

const SaveResultInput = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="Save" onClick={onClick}><span><SaveIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}

const PrintWorkkSheet = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="Save" onClick={onClick}><span><PrintIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}
const Update = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="Update" onClick={onClick}><span><UpdateIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}
const Delete = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="Delete" onClick={onClick}><span><DeleteIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}
const AllParamater = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="All Paramater" onClick={onClick}><span><AllListIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}
const GetNewData = ({ onClick }: Props) => {
    return (
        <StyleControllButtonIcon name="Check new data" onClick={onClick}><span><GetDataIcon fontSize="inherit" /></span></StyleControllButtonIcon>
    )
}
export const ControlVerifyButton = ({ onClick, isVerify }: VerifyButtonProps) => {
    return (
        <div className="control-button">
            {isVerify ? <VerifyWorkSheet onClick={onClick} />
                : <UnVerifyWorkSheet onClick={onClick} />}
        </div>
    )
}

export const ControlSaveResultInput = ({ onClick }: Props) => {
    return (
        <div className="control-button">
            <SaveResultInput onClick={onClick} />
        </div>
    )
}

export const ControlPrintWorkSheet = ({ onClickPrint, onClickDelete, onClickUpdate }: PrintButtonProps) => {
    return (
        <div className="control-button">
            <PrintWorkkSheet onClick={onClickPrint} />
            <Update onClick={onClickUpdate} />
            <Delete onClick={onClickDelete} />
        </div>
    )
}
export const ControlManagerVerifyWorkSheet = ({ onClickCheckNewData, onClickAllparamater, onClickVerify,
    isVerify, isCheckNewData, isDisplayVerify }: ManagerVerifyButtonProps) => {
    console.log(isDisplayVerify, 'aa')
    return (
        <div className="control-button">
            {isDisplayVerify && <>{isVerify ? <VerifyWorkSheet onClick={onClickVerify} /> : <UnVerifyWorkSheet onClick={onClickVerify} />}</>}
            <AllParamater onClick={onClickAllparamater} />
            {isCheckNewData && <GetNewData onClick={onClickCheckNewData} />}
        </div>
    )
}



const ControllButtonNewSample = () =>
(<ControllFormButton>

    {({ values, setValues, submitForm }) => {

        return (
            <div className="control-button">
                <AddSample onClick={() => {
                    values.samples.push({
                        sampleID: 0,
                        sampleNo: 0,
                        workSheetID: values.workSheetID,
                        status: 0,
                        description: '',
                        weight: 0,
                        note: '',
                        sealNumber: '',
                        sampling: false,
                        urgent: false,
                        paramaters: [
                            {
                                methodID: "",
                                method: '',
                                department: '',
                                result: "",
                                status: 0,
                                unit: "default",
                                resultDate: ""
                            }
                        ]
                    })
                    setValues(values)
                }} />
                <RemoveSample onClick={() => {
                    if (values.samples.length > 1) {
                        values.samples.pop()
                        setValues(values)
                    }

                }} />
                <SaveSample
                    onClick={() => {
                        submitForm()
                    }} />


            </div>
        )
    }}

</ControllFormButton>)

export const ControllButtonInputResult = () =>
(<ControllFormButton>

    {({ submitForm, values, setFieldError }) => {

        return (
            <div className="control-button">
                <SaveSample
                    onClick={() => {
                        if (microResultValidate(values).result) {
                            submitForm()
                        } else {
                            microResultValidate(values).err.forEach((err) => {
                                setFieldError(err.position, err.message)
                            })
                        }
                    }} />
            </div>
        )
    }}

</ControllFormButton>)


export default ControllButtonNewSample;