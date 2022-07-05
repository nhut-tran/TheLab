import { useLayoutEffect, useState } from "react";
import { Button } from "../../App/structure/FormElement";
import { useFormikContext } from "formik";
import { observer } from 'mobx-react-lite'
import { useStore } from "../../store/appStore";
import { Spinner } from "../../style/Spinner";
import { toJS } from "mobx";
import { useRouteMatch } from "react-router-dom";
import { history } from "../..";
import { useRef } from "react";
import { WorkSheet } from "../../api/entity";
import WorkSheetForm from "../../component/WorkSheetForm";
import { Wrapper } from "../../style/Wrapper";
import { Modal } from "../../App/structure/Modal";
import { StyleSectionHeader } from "../../App/structure/SectionHeader";



export const ControllFormButton = () => {
    const { values, submitForm, setValues } = useFormikContext<WorkSheet>()

    return (
        <>
            <Button top='40%' left='92%' type='button' onClick={() => {
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
                            result: "",
                            unit: "",
                            methodID: "",
                            method: "",
                            resultDate: ""
                        }
                    ]
                })
                setValues(values)
            }}>Add Sample</Button>
            <Button top='50%' left='92%' type='button' onClick={() => {
                values.samples.pop()
                setValues(values)
            }}>Remove Sample
            </Button>
            <Button className='form_button' top='60%' left='92%'
                onClick={() => {
                    submitForm()
                }}
                type="button">Save</Button>
        </>
    )
}

const CreateSample = observer(() => {

    const matchEdit = useRouteMatch('/new/:id')
    let [iniital, setInitial] = useState({} as WorkSheet)
    const { sampleStore, commonStore } = useStore();
    const saveStatus = useRef(false);
    const [display, setDisplay] = useState(false)
    const handleSubmit = (val: WorkSheet) => {
        saveStatus.current = true
        if (!matchEdit?.isExact) {

            sampleStore.UpdateSample(val)
        } else {
            sampleStore.CreateSample(val)
        }
    }
    useLayoutEffect(() => {
        let unBlock = history.block(() => {

            if (saveStatus.current) {
                return unBlock()
            }

            if (!display) {
                setDisplay(true)
            }

            return false
        })
        if (saveStatus.current) {
            history.goBack()
        }
        return () => {
            localStorage.removeItem('newsample')
            unBlock()
        }

    }, [display])


    useLayoutEffect(() => {
        let savedSample = localStorage.getItem('newsample');

        if (sampleStore.workSheet.workSheetNo) {
            setInitial({ ...toJS(sampleStore.workSheet) })

        } else if (savedSample) {

            setInitial(JSON.parse(savedSample))
        }
    }, [])


    if (!iniital.workSheetNo) {
        return <Spinner isDisPlay={commonStore.isFetching}><h3>Loading .......</h3></Spinner>
    }
    return (
        <Wrapper className='wrapper'>
            <StyleSectionHeader className='section-header' size="large" content='Create Sample' />
            {
                display && <Modal className='modal' setDisplay={setDisplay} saveStatus={saveStatus} />
            }

            <WorkSheetForm initialValue={iniital} handleSubmit={handleSubmit} />

        </Wrapper>
    )

})

export default CreateSample