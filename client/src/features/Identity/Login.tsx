import React from "react";
import { Formik, Form } from "formik";
import { Wrapper, WrapperForForm } from "../../style/Wrapper";
import * as Yup from 'yup'
import { Button, Input, InputPassWord } from "../../App/structure/FormElement";

import { useStore } from "../../store/appStore";
import { FormContainer } from '../../style/Form';
import { Link } from "react-router-dom";

import { observer } from "mobx-react-lite";


const Login = observer(() => {

    const { userStore, commonStore } = useStore()
    return (
        <Wrapper>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}

                validationSchema={Yup.object({
                    email: Yup.string().min(3)
                        .required('Required'),
                    password: Yup.string().required('Required'),
                    // [`over18`]: Yup.boolean().validate,

                })}

                onSubmit={(val) => {
                    console.log(val)
                    userStore.login(val);

                }}
            >
                {
                    ({ values, errors }) => {

                        return (
                            <Form>
                                <FormContainer direction='column' className='form_container'>
                                    <Input label='Email' name='email' className='form_group' /><br></br>
                                    <InputPassWord label='password' name='password' type='password' className='form_group' /><br></br>
                                    <Button disabled={commonStore.isFetching} position='relative' type='submit'>Login</Button>
                                    <Link to='/register'>Register</Link>
                                </FormContainer>
                            </Form>
                        )
                    }
                }





            </Formik>

        </Wrapper >
    )

})


export default Login