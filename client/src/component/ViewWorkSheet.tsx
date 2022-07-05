import { FieldArray, Form, Formik } from 'formik'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import * as React from 'react'
import { useParams } from 'react-router'
import { WorkSheet } from '../api/entity'
import { Button, Input, Select } from '../App/structure/FormElement'
import { WorkSheetStatusLimitAccess } from '../config/WorkSheetStatus'
import { useStore } from '../store/appStore'
import { FormContainer, FormContainerGrid, FormSection } from '../style/Form'
import { Spinner } from '../style/Spinner'
import { WrapperForForm } from '../style/Wrapper'
import AutoSave from './AutoSave'

interface Prop {
    viewOnly?: boolean
    children?: React.ReactNode,
    autoSaveName?: string,
    limit?: number
}


const ViewWorkSheet = observer(({ viewOnly, children, autoSaveName, limit }: Prop) => {

    const { sampleStore, methodStore, commonStore, userStore } = useStore()
    const { id } = useParams<{ id: string }>();
    let [iniital, setInitial] = React.useState({} as WorkSheet)
    const ref = React.useRef(WorkSheetStatusLimitAccess[userStore.user?.department || ''].endlimit)
    const checkStatus = (status: number | undefined, limit: number) => {
        if (limit && status) return status >= limit;
        return false;
    }
    React.useEffect(() => {
        methodStore.getMethod();
    }, [methodStore.methodList.length, methodStore])
    React.useLayoutEffect(() => {

        //if autosavename => use for save in localstorage
        if (autoSaveName && !sampleStore.workSheet.workSheetNo) {

            let savedSample = localStorage.getItem(autoSaveName);

            if (savedSample) {

                setInitial(JSON.parse(savedSample))
            } else {
                setInitial({ ...toJS(sampleStore.workSheet) })
                // fistRender.current += 1
            }
        } else if (sampleStore.workSheet.workSheetNo) {

            setInitial({ ...toJS(sampleStore.workSheet) })
        } else {
            //fetch data if not avaliable

            commonStore.search({ Worksheet: id, WorkSheet_BySample: "" }).then(() => {
                setInitial({ ...toJS(sampleStore.workSheet) })
            })

        }
        return () => {

        }

    }, [autoSaveName, sampleStore.workSheet])

    if (!iniital.workSheetNo) {
        return <Spinner isDisPlay={true}><h3>Loading .......</h3></Spinner>
    }

    return (

        <WrapperForForm width='100%'>
            <Formik
                initialValues={iniital}
                enableReinitialize
                onSubmit={(val) => {

                    sampleStore.ResultInput(val)

                }}
            >
                {({ values }) => {
                    return (

                        <Form>

                            <FormSection direction='column' className='form_section'>

                                <h4 style={{ alignSelf: 'start' }}>General Information</h4>

                                <FormContainer className='form_container'>
                                    <Input type='text' className='form_group' disabled={true} label='Receive Date' name={`receiveDate`} />
                                    <Input type='text' className='form_group' disabled={true} label='WorkSheetNO' name={`workSheetNo`} />
                                </FormContainer>
                            </FormSection>
                            <FieldArray name='workSheet'
                                render={() => (
                                    <>
                                        {<FormSection className='form_section-nhh' direction='column'>

                                            {
                                                <FieldArray name={`samples`} render={
                                                    (h) => (
                                                        <>
                                                            {
                                                                values.samples.map((s, ind) => (

                                                                    <div className='form_container_sub' style={{ width: '100%' }} key={s.sampleID}>

                                                                        <h4>{ind + 1}: {s.description ? s.description : ''}</h4>

                                                                        <FormContainerGrid className='form_container' >
                                                                            <div style={{ gridRow: '1 / -1', fontSize: '1.2rem' }}>
                                                                                <div>Sample NO: {s.sampleNo}</div>
                                                                                <div>Weight: {s.weight}</div>
                                                                                <div>Seal No: {s.sealNumber}</div>
                                                                                <div>Sampling: {s.sampling ? 'yes' : 'no'}</div>
                                                                            </div>
                                                                            <FieldArray name={`samples.${ind}.paramaters`}
                                                                                render={
                                                                                    () => (
                                                                                        <>
                                                                                            <FormContainer className='form_group' direction='column' >
                                                                                                {
                                                                                                    s.paramaters.map((p, indP) => (

                                                                                                        <Select className='form_group' remark={checkStatus(p.status, ref.current)} label={`Paramaters ${indP + 1}`} key={`samples.${ind}.paramaters.${indP}.methodID`} name={`samples.${ind}.paramaters.${indP}.methodID`} >
                                                                                                            <option disabled key={p.methodID} value={p.methodID}>{methodStore.methodRegistry.get(p.methodID)?.name}</option>
                                                                                                        </Select>
                                                                                                    ))

                                                                                                }
                                                                                            </FormContainer>
                                                                                            <FormContainer className='form_group' direction='column' >

                                                                                                {s.paramaters.map((p, indP) => (


                                                                                                    <Select className='form_group' remark={checkStatus(p.status, ref.current)} label={`Unit ${indP + 1}`} key={`samples.${ind}.paramaters.${indP}.methodID`} name={`samples.${ind}.paramaters.${indP}.methodID`} >

                                                                                                        <option key={p.methodID} value={p.methodID}>{methodStore.methodRegistry.get(p.methodID)?.unit}</option>
                                                                                                    </Select>
                                                                                                ))
                                                                                                }
                                                                                            </FormContainer>
                                                                                            <FormContainer className='form_group' direction='column'>
                                                                                                {s.paramaters.map((p, indP) => (

                                                                                                    <Input remark={checkStatus(p.status, ref.current)} type='text' className='form_group' disabled={
                                                                                                        viewOnly !== undefined ? viewOnly :
                                                                                                            p.status && limit ? p.status >= limit : viewOnly
                                                                                                    } label='Result' name={`samples.${ind}.paramaters.${indP}.result`} />))
                                                                                                }

                                                                                            </FormContainer>
                                                                                        </>
                                                                                    )

                                                                                }
                                                                            />

                                                                        </FormContainerGrid>
                                                                    </div>
                                                                ))
                                                            }
                                                        </>
                                                    )
                                                } />

                                            }

                                        </FormSection>

                                        }

                                    </>
                                )}

                            />

                            {autoSaveName && <AutoSave item={autoSaveName} />}
                            {!viewOnly && children}
                        </Form>
                    )
                }

                }


            </Formik>
        </WrapperForForm>

    )
})

export default ViewWorkSheet