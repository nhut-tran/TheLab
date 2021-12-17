import { Wrapper, WrapperForForm } from "../../style/Wrapper";
import { useStore } from "../../store/appStore";
import { observer } from 'mobx-react-lite';
import { Button, Input } from '../../App/structure/FormElement';
import { Form, Formik } from 'formik';

const NewSample = observer(() => {


    const { sampleStore, commonStore } = useStore();

    return (
        <Wrapper>
            <WrapperForForm width='100%'>
                <Formik
                    initialValues={{ numSample: 1 }}

                    validate={(val) => {
                        if (val.numSample <= 0) return { numSample: "Number of sample must be > 0" }
                    }}
                    onSubmit={async (val) => {
                        await sampleStore.getBlankWorkSheet(val.numSample);
                    }}
                >
                    {(values) => {
                        return (
                            <Form>
                                <Input name={'numSample'} type='text' className='form_group' label='Number of Sample' />
                                <Button disabled={commonStore.isFetching} type={"submit"} className='form_button' position='relative' top='30%' right='10%'>Add WorkSheet</Button>
                            </Form>
                        )
                    }}


                </Formik>

            </WrapperForForm>
        </Wrapper>
    );


})

export default NewSample