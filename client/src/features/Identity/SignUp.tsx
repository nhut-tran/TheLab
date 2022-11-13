import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Wrapper, WrapperForForm } from "../../style/Wrapper";
import * as Yup from 'yup'
import { Button, Input, InputPassWord, Select } from "../../App/structure/FormElement";
import { useStore } from "../../store/appStore";
import { FormContainer } from "../../style/Form";
import { observer } from "mobx-react-lite";


const SignUp = observer(() => {
    const { userStore, commonStore, departmentStore } = useStore()
    useEffect(() => {
        departmentStore.getDepartment();

    }, [departmentStore])
    return (
        <Wrapper>
            <WrapperForForm width='100%'>
                <Formik
                    initialValues={{
                        userName: '',
                        email: '',
                        department: '',
                        password: '',
                        passwordConfirm: '',
                        title: ''
                    }}

                    validationSchema={Yup.object({
                        userName: Yup.string().required(),
                        email: Yup.string().email('Inavlid email')
                            .required('Required'),
                        password: Yup.string().required('Required'),
                        passwordConfirm: Yup.string().required('Required').test("passwordmatch", 'Password confirm not match', function (val) {
                            return this.parent.password === val;
                        }),
                        title: Yup.string().required('Required'),

                    })}

                    onSubmit={(val) => {
                        userStore.signUp(val);
                    }}
                >


                    <Form>
                        <FormContainer direction='column' className='form_container'>
                            <Input label='Name' name='userName' className='form_group' />
                            <Input label='Title' name='title' className='form_group' />
                            <Input label='Email' name='email' className='form_group' />
                            <InputPassWord label='Password' name='password' type='password' className='form_group' />
                            <InputPassWord label='Password Confirm' name='passwordConfirm' type='password' className='form_group' />
                            <Select className='form_group' label='Department' key={`department`} name={`department`} >
                                <option disabled value=''>---Select Department----</option>
                                {departmentStore.departmentList.map((dep) => {

                                    return (
                                        <option key={dep.departmentID} value={dep.departmentID}>{dep.name}</option>
                                    )
                                })}

                            </Select>
                            <Button disabled={commonStore.isFetching} position='relative' type='submit'>Sign Up</Button>
                        </FormContainer>
                    </Form>


                </Formik>
            </WrapperForForm>
        </Wrapper >
    )

})


export default SignUp