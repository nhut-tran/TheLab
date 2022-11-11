import { Wrapper } from "../../style/Wrapper";
import { useStore } from "../../store/appStore";
import { observer } from 'mobx-react-lite';
import { Button, Input, Select } from '../../App/structure/FormElement';
import { Form, Formik } from 'formik';
import { StyleSectionHeader } from "../../App/structure/SectionHeader";
import { StyleForm } from "../../style/Form";
import { useEffect } from "react";

const NewSample = observer(() => {
    const { sampleStore, commonStore, departmentStore } = useStore();
    useEffect(() => {
        departmentStore.getDepartment()
    }, [])
    return (
        <Wrapper>
            <StyleSectionHeader className='section-header' size="large" content='New Sample' />

            <Formik
                initialValues={{ numSample: 1 }}

                validate={(val) => {
                    if (val.numSample <= 0) return { numSample: "Number of sample must be > 0" }
                }}
                onSubmit={async ({ numSample }) => {
                    await sampleStore.getBlankWorkSheet(numSample);
                }}
            >
                {(values) => {
                    return (
                        <StyleForm>
                            <Input name={'numSample'} type='text' className='form_group' label='Number of Sample' />

                            <Button disabled={commonStore.isFetching} type={"submit"} className='form_button' position='relative' top='30%' right='10%'>Add WorkSheet</Button>
                        </StyleForm>
                    )
                }}


            </Formik>


        </Wrapper>
    );


})

export default NewSample