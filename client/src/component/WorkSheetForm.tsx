import { FieldArray, Form, Formik, getIn } from "formik"
import { WrapperControlForm } from "../style/Wrapper"
import * as Yup from 'yup';
import { Method, MethodSampleAss, Sample, WorkSheet } from "../api/entity";
import { FormContainer, FormSection } from "../style/Form";
import { Button, CheckBox, Input, Select } from "../App/structure/FormElement";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../store/appStore";
import AutoSave from "./AutoSave";
import { observer } from "mobx-react-lite";
import ControllButtonNewSample from "./ControllButtonNewSample";
import { toJS } from "mobx";




interface Props {

    handleSubmit: (val: WorkSheet) => void
}


const WorkSheetForm = observer(({ handleSubmit }: Props) => {
    const { methodStore, customerStore, departmentStore, sampleStore } = useStore();
    const [department, setDepartment] = useState("");
    const refMethodList = useRef<Method[]>([]);

    const refDefaultMethodId = useRef("");
    const labOnly = useMemo(() => {
        return departmentStore.getLab();
    }, [departmentStore.departmentList])
    const sortMethodByDept = useMemo(() => {
        if (!department) return refMethodList.current;
        return refMethodList.current.filter((med) => med.departmentID === department);
    }, [department])

    useEffect(() => {
        methodStore.getMethod().then(() => {
            refMethodList.current = methodStore.methodList.filter(m => !m.default);
            const defaultMed = methodStore.methodList.find(m => m.default)
            if (defaultMed) {
                refDefaultMethodId.current = defaultMed.methodID
                setDepartment(defaultMed.departmentID)
            }
        })

    }, [methodStore.methodList.length, methodStore])

    useEffect(() => {
        customerStore.getCustomer()
    }, [customerStore.customerList.length, customerStore])
    useEffect(() => {
        departmentStore.getDepartment()
    }, [])



    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                ...toJS(sampleStore.workSheet)
            }}
            validationSchema={
                Yup.object().shape({
                    workSheetID: Yup.string().required('Required'),
                    workSheetNo: Yup.string().required('Required'),
                    issueTo: Yup.string().required('Required'),
                    receiveDate: Yup.string().required('Required'),
                    samples: Yup.array().of(Yup.object({
                        description: Yup.string().required('Required'),
                        weight: Yup.number().transform((val) => parseFloat(val))
                            .typeError('Must be a positive number').required('Required'),
                        paramaters: Yup.array().of(Yup.object({
                            methodID: Yup.string().required('Required')
                        })).min(1, 'at least one paramaters')
                    }))

                })
            }
            onSubmit={(val, { setErrors }) => {
                let index = -1;
                val.samples.forEach((s, i) => {
                    const params = s.paramaters.map(p => p.methodID);
                    console.log(index)
                    if (new Set(params).size === params.length) {

                        index = i;
                    }
                })
                // console.log(index)
                if (index > -1) {
                    setErrors({
                        samples: "duplictate params"
                    })
                } else {
                    handleSubmit(val)
                }


            }}>
            {({ values, errors }) => {

                return (
                    <WrapperControlForm>
                        <Form className="worksheet-form">
                            <FormSection direction='column' className='form_section_info'>
                                <h4 style={{ alignSelf: 'start' }}>General Information</h4>
                                <FormContainer className='form_container'>
                                    <Input type='text' className='form_group' disabled={true} label='Receive Date' name={`receiveDate`} />
                                    <Input type='text' className='form_group' disabled={true} label='WorkSheetNO' name={`workSheetNo`} />
                                    <Input type='text' className='form_group' label='Note' name={`note`} />
                                    <Select className='form_group' label='Customer' key={`customer`} name={`issueTo`} >
                                        <option disabled value=''>---Select Customer----</option>
                                        {customerStore.customerList.map((cus) => {
                                            return (
                                                <option key={cus.customerId} value={cus.customerId}>{cus.name}</option>
                                            )
                                        })}

                                    </Select>
                                    <Select value={department} className='form_group' label='Department' key={`Department`} handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => { console.log(e.target.value); setDepartment(e.target.value) }} name={`selectedDept`} >
                                        <option value="">---Select Department----</option>
                                        {labOnly.map((dep) => {

                                            return (
                                                <option selected={dep.departmentID === department} key={dep.departmentID} value={dep.departmentID}>{dep.name}</option>
                                            )
                                        })}

                                    </Select>
                                </FormContainer>
                            </FormSection>
                            <FieldArray name='workSheet'
                                render={() => (
                                    <FormSection className='form_section_detail' direction='column'>
                                        {
                                            <FieldArray name={`samples`} render={
                                                () => values.samples.map((s, ind) => (

                                                    <>
                                                        <h4>Sample {ind + 1} {s.description ? s.description : ''}</h4>
                                                        <FormContainer className='form_container_sample_info' direction='row'>
                                                            <FormContainer className='form_container_sample_detail' direction='row' width="50%">
                                                                <Input type='text' className='form_group' label='Description' name={`samples.${ind}.description`} />
                                                                <Input className='form_group' label='Weight' name={`samples.${ind}.weight`} />
                                                                <Input className='form_group' label='Seal Numer' name={`samples.${ind}.sealNumber`} />
                                                                <Input className='form_group' label='Note' name={`samples.${ind}.note`} />
                                                                <CheckBox className='form_group' label='Sampling' name={`samples.${ind}.sampling`} type='checkbox' display='' />
                                                                <CheckBox className='form_group' label='Urgent' name={`samples.${ind}.urgent`} type='checkbox' display='' />
                                                                <FieldArray name={`samples.${ind}.paramaters`}
                                                                    render={
                                                                        (helperPara) => (
                                                                            <FormContainer className="form_container_button_group" width="60%" justify="space-evenly">
                                                                                <Button className='form_button' position='relative' type='button' onClick={() => {

                                                                                    helperPara.push({

                                                                                        methodID: `${refDefaultMethodId.current}`,
                                                                                        department

                                                                                    })
                                                                                }}>+</Button>
                                                                                <Button className='form_button' position='relative' type='button' onClick={() => {
                                                                                    if (values.samples[ind].paramaters.length > 1) helperPara.pop();
                                                                                }}>-</Button>
                                                                            </FormContainer>
                                                                        )} />
                                                            </FormContainer>
                                                            <FormContainer className='form_container_parameter' width="50%" justify="space-evenly">
                                                                <FieldArray name={`samples.${ind}.paramaters`}
                                                                    render={
                                                                        () => values.samples[ind].paramaters.map((p, indP) => {

                                                                            return (
                                                                                <div key={p.methodID + indP}>
                                                                                    {typeof getIn(errors, `samples.${ind}.paramaters`) === 'string' && <div>{getIn(errors, `samples.${ind}.paramaters`)}</div>}

                                                                                    <Select value={p.methodID} className='form_group' key={`samples.${ind}.paramaters.${indP}.methodID`} name={`samples.${ind}.paramaters.${indP}.methodID`} >

                                                                                        <option hidden >---Select Method----</option>

                                                                                        {sortMethodByDept.map((med) => {
                                                                                            console.log(med.name)
                                                                                            if (p.department !== med.departmentID) {
                                                                                                return <option key={p.methodID} value={p.methodID} >{refMethodList.current.find((m) => m.methodID === p.methodID)?.name}</option>
                                                                                            }

                                                                                            return <option key={med.methodID} value={med.methodID}>{med.name}</option>
                                                                                        })}
                                                                                    </Select>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    } />
                                                            </FormContainer>
                                                        </FormContainer>
                                                    </>
                                                ))
                                            } />

                                        }

                                    </FormSection>
                                )
                                }
                            />

                            <AutoSave item="newsample" />
                            <ControllButtonNewSample department={department} />
                        </Form>
                    </WrapperControlForm>

                )
            }

            }
        </Formik >


    )
})

export default WorkSheetForm