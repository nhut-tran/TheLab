import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Input } from '../App/structure/FormElement';
import { useStore } from '../store/appStore';
import { StyleForm } from "../style/Form"



const SearchInput = observer(() => {
    const { commonStore } = useStore()
    return (


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
                        : errObject.WorkSheet_BySample = 'SampleNo or WorsheetNo is required'
                    setErrors(errObject)
                }

            }}
        >
            <StyleForm>
                <Input label='WorkSheet' name='Worksheet' className='form_group' />
                <Input label='Sample' name='WorkSheet_BySample' className='form_group' />
                <Button position='relative' type='submit' marginTop="10px" >Find WorkSheet</Button>
            </StyleForm>
        </Formik>


    )
})

export default SearchInput