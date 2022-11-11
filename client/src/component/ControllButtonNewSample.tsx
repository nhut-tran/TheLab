import ControllFormButton from "./ControlFormButton"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import styled from "styled-components";

interface Props {
    onClick: () => void,

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


export default ControllButtonNewSample;