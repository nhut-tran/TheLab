import React, { useEffect } from "react";
import { Formik, } from "formik";
import { Wrapper } from "../../style/Wrapper";
import * as Yup from 'yup'
import { Button, Input, Select } from "../../App/structure/FormElement";
import { useStore } from "../../store/appStore";
import { FormContainer, StyleForm } from "../../style/Form";
import { observer } from "mobx-react-lite";
import { Method } from "../../api/entity";
import { StyleSectionHeader } from "../../App/structure/SectionHeader";




const CreateMethod = observer(() => {
    const { methodStore, departmentStore, commonStore } = useStore()
    useEffect(() => {
        departmentStore.getDepartment();
    }, [])
    const initialVal: Method = {
        methodID: "",
        name: "",
        unit: "",
        description: "",
        turnArroundDay: 0,
        departmentID: "",
        target: ""
    };
    return (
        <Wrapper>
            <StyleSectionHeader className='section-header' size="large" content='New Method' />
            <Formik
                initialValues={initialVal}

                validationSchema={Yup.object({
                    name: Yup.string().required(),
                    unit: Yup.string().required('Required'),
                    description: Yup.string().required('Required'),
                    turnArroundDay: Yup.number().required('Required').positive(),
                    target: Yup.string().required('Required'),
                    departmentID: Yup.string().required('Required'),
                })}

                onSubmit={(val) => {
                    console.log(val)

                    methodStore.createMethod(val)
                }}
            >
                <StyleForm>
                    <FormContainer direction='column' className='form_container'>
                        <Input label='Method Name' name='name' className='form_group' />
                        <Input label='Unit' name='unit' className='form_group' />
                        <Input label='Description' name='description' className='form_group' />
                        <Input label='Turn Arround Day' name='turnArroundDay' className='form_group' />
                        <Input label='target' name='target' className='form_group' />

                        <Select className='form_group' label='Department' key={`department`} name={`departmentID`} >
                            <option disabled value=''>---Select Department----</option>
                            {departmentStore.departmentList.map((dep) => {

                                return (
                                    <option key={dep.departmentID} value={dep.departmentID}>{dep.name}</option>
                                )
                            })}

                        </Select>
                        <Button disabled={commonStore.isFetching} position='relative' type='submit'>Create method</Button>
                    </FormContainer>
                </StyleForm>
            </Formik>

        </Wrapper >
    )

})


export default CreateMethod;