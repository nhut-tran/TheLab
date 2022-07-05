import { Button } from '../../App/structure/FormElement'
import { StyleSectionHeader } from '../../App/structure/SectionHeader'
import ControllFormButton from '../../component/ControlFormButton'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'
import { microResultValidate } from '../../utils/validation/resultValidation'



const ResultInput = () => {
    const { process } = useAccessWorkSheetByStatusVerify();
    return (
        <Wrapper>
            <StyleSectionHeader className='section-header' size="large" content='Input Result' />
            //allow for input if only in proccess status
            <ViewWorkSheet autoSaveName="result" limit={3}>
                {process && <ControllFormButton>
                    {({ submitForm, values, setFieldError }) => <Button className='form_button' top='60%' left='92%'
                        onClick={() => {
                            if (microResultValidate(values).result) {
                                submitForm()
                            } else {

                                microResultValidate(values).err.forEach((err) => {

                                    setFieldError(err.position, err.message)
                                })
                            }
                        }

                        }
                        type="button">Save</Button>}
                </ControllFormButton>}
            </ViewWorkSheet>

        </Wrapper >
    )
}

export default ResultInput