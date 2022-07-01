import { FieldArray, Form, Formik, getIn } from "formik"
import { WrapperForForm } from "../style/Wrapper"
import * as Yup from 'yup';
import { Method, WorkSheet } from "../api/entity";
import { FormContainer, FormContainerGrid, FormSection } from "../style/Form";
import { Button, CheckBox, Input, Select } from "../App/structure/FormElement";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../store/appStore";

import AutoSave from "./AutoSave";
import ControllFormButton from "./ControlFormButton";
import { observer } from "mobx-react-lite";





interface Props {
    initialValue: WorkSheet,
    handleSubmit: (val: WorkSheet) => void
}


const WorkSheetForm = observer(({ initialValue, handleSubmit }: Props) => {
    const { methodStore, customerStore, departmentStore } = useStore();
    const [department, setDepartment] = useState("");
    const refMethodList = useRef<Method[]>([]);
    const sortMethodByDept = (deptID: string, methodList: Method[]) => {
        if (!deptID) return methodList;
        return methodList.filter((med) => med.departmentID === deptID);
    }

    useEffect(() => {
        methodStore.getMethod();
        refMethodList.current = methodStore.methodList;
    }, [methodStore.methodList.length, methodStore])

    useEffect(() => {
        customerStore.getCustomer()
    }, [customerStore.customerList.length, customerStore])
    useEffect(() => {
        departmentStore.getDepartment();
    }, [])


    return (

        <WrapperForForm width='100%'>
            <Formik
                enableReinitialize={true}
                initialValues={{ ...initialValue }}
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
                onSubmit={(val) => {

                    handleSubmit(val)

                }}
            >
                {({ values, errors }) => {

                    return (

                        <Form>

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
                                    <Select className='form_group' label='Department' key={`Department`} handleChange={(e: React.ChangeEvent<any>) => { setDepartment(e.target.value) }} name={`selectedDept`} >
                                        <option value="all">---Select Department----</option>
                                        {departmentStore.departmentList.filter(e => (e.name.includes('Lab') && !e.name.includes('Manager'))).map((dep) => {

                                            return (
                                                <option key={dep.departmentID} value={dep.departmentID}>{dep.name}</option>
                                            )
                                        })}

                                    </Select>


                                </FormContainer>
                            </FormSection>
                            <FieldArray name='workSheet'
                                render={() => (
                                    <>
                                        {
                                            <FormSection className='form_section_detail' direction='column'>
                                                {
                                                    <FieldArray name={`samples`} render={
                                                        (h) => (
                                                            <>
                                                                {
                                                                    values.samples.map((s, ind) => (
                                                                        <div className='form_container_sub' key={s.sampleID}>
                                                                            <FormContainer className='form_container_title' direction='row'>
                                                                                <h4>Sample {ind + 1} {s.description ? s.description : ''}</h4>

                                                                            </FormContainer>
                                                                            <FormContainer className='form_container_sample_info' direction='row'>
                                                                                <FormContainer className='form_container_sample_detail' direction='row' width="50%">
                                                                                    {/* <Input type='text' className='form_group' value={s.sampleNo === 0 ? "Unknown" : s.sampleNo} disabled={true} label='SampleNO' name={`samples.${ind}.sampleNo`} /> */}
                                                                                    <Input type='text' className='form_group' label='Description' name={`samples.${ind}.description`} />
                                                                                    <Input className='form_group' label='Weight' name={`samples.${ind}.weight`} />
                                                                                    <Input className='form_group' label='Seal Numer' name={`samples.${ind}.sealNumber`} />

                                                                                    <Input className='form_group' label='Note' name={`samples.${ind}.note`} />
                                                                                    <CheckBox className='form_group' label='Sampling' name={`samples.${ind}.sampling`} type='checkbox' display='' />
                                                                                    <CheckBox className='form_group' label='Urgent' name={`samples.${ind}.urgent`} type='checkbox' display='' />
                                                                                    <FieldArray name={`samples.${ind}.paramaters`}
                                                                                        render={
                                                                                            (helperPara) => (
                                                                                                <>

                                                                                                    <FormContainer className="form_container_button_group" width="60%" justify="space-evenly">
                                                                                                        <Button className='form_button' position='relative' type='button' onClick={() => {
                                                                                                            helperPara.push({ methodID: "00000000-0000-0000-0000-000000000000", method: "" })
                                                                                                        }}>+</Button>
                                                                                                        <Button className='form_button' position='relative' type='button' onClick={() => {
                                                                                                            if (values.samples[ind].paramaters.length > 1) helperPara.pop();
                                                                                                        }}>-</Button>
                                                                                                    </FormContainer>
                                                                                                </>

                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </FormContainer>
                                                                                <FormContainer className='form_container_parameter' width="50%" direction="column" justify="space-evenly">
                                                                                    <FieldArray name={`samples.${ind}.paramaters`}
                                                                                        render={
                                                                                            () => (
                                                                                                <>

                                                                                                    {
                                                                                                        values.samples[ind].paramaters.map((p, indP) => {

                                                                                                            return (
                                                                                                                <div key={p.methodID + indP}>
                                                                                                                    {typeof getIn(errors, `samples.${ind}.paramaters`) === 'string' && <div>{getIn(errors, `samples.${ind}.paramaters`)}</div>}

                                                                                                                    <Select className='form_group' key={`samples.${ind}.paramaters.${indP}.methodID`} name={`samples.${ind}.paramaters.${indP}.methodID`} >
                                                                                                                        <option hidden >---Select Method----</option>

                                                                                                                        {sortMethodByDept(department, refMethodList.current).map((med, i) => {
                                                                                                                            if (p.methodID !== "00000000-0000-0000-0000-000000000000") {
                                                                                                                                return <option key={p.methodID} value={p.methodID}>{refMethodList.current.find((m) => m.methodID === p.methodID)?.name}</option>
                                                                                                                            }
                                                                                                                            return <option key={med.methodID} value={med.methodID}>{med.name}</option>
                                                                                                                        })}



                                                                                                                    </Select>
                                                                                                                </div>
                                                                                                            )
                                                                                                        })
                                                                                                    }


                                                                                                </>

                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </FormContainer>
                                                                            </FormContainer>



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
                                )
                                }

                            />
                            <AutoSave item="newsample" />
                            <ControllFormButton>

                                {({ values, setValues, submitForm }) => {

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
                                                            methodID: "00000000-0000-0000-0000-000000000000",
                                                            method: "",
                                                            resultDate: ""
                                                        }
                                                    ]
                                                })
                                                setValues(values)
                                            }}>Add Sample</Button>
                                            <Button top='50%' left='92%' type='button' onClick={() => {
                                                if (values.samples.length > 1) {
                                                    values.samples.pop()
                                                    setValues(values)
                                                }

                                            }}>Remove Sample
                                            </Button>
                                            <Button className='form_button' top='60%' left='92%'
                                                onClick={() => {
                                                    submitForm()
                                                }}
                                                type="button">Save</Button>


                                        </>
                                    )
                                }}

                            </ControllFormButton>

                        </Form>
                    )
                }

                }
            </Formik >
        </WrapperForForm >

    )
})

export default WorkSheetForm