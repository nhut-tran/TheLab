import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import { Button, Input } from '../App/structure/FormElement'
import { useStore } from '../store/appStore'
import { FormContainer } from '../style/Form'
import { WrapperForForm } from '../style/Wrapper'



const SearchInput = observer(() => {
    const { commonStore } = useStore()
    return (

        <WrapperForForm className='Wrapper_form' width='100%'>
            <Formik
                initialValues={{
                    Worksheet: '',
                    WorkSheet_BySample: ''
                }}


                onSubmit={(val, { setErrors }) => {
                    if (val.Worksheet.length > 4 || val.WorkSheet_BySample.length > 0) {
                        commonStore.search(val)
                    } else {
                        const errObject = {
                            Worksheet: '',
                            WorkSheet_BySample: ''
                        }
                        val.Worksheet.length > 0 ? errObject.Worksheet = 'Invalid WorkSheetNo'
                            : errObject.WorkSheet_BySample = 'Please enter sampleNo or WorsheetNo'
                        setErrors(errObject)
                    }

                }}
            >
                <Form>
                    <FormContainer direction='column' className='form_container'>
                        <Input label='WorkSheet' name='Worksheet' className='form_group' />
                        <Input label='Sample' name='WorkSheet_BySample' className='form_group' />
                        <Button position='relative' type='submit'>Find WorkSheet</Button>

                    </FormContainer>
                </Form>
            </Formik>
        </WrapperForForm >

    )
})

export default SearchInput