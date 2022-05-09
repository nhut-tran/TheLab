import { Button } from '../../App/structure/FormElement'
import ControllFormButton from '../../component/ControlFormButton'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper } from '../../style/Wrapper'

import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'



const ResultInput = () => {
    const { process } = useAccessWorkSheetByStatusVerify();
    return (
        <Wrapper>
            //allow for input if only in proccess status
            <ViewWorkSheet autoSaveName="result" limit={3}>
                {process && <ControllFormButton>
                    {({ submitForm }) => <Button className='form_button' top='60%' left='92%'
                        onClick={() => {

                            submitForm()
                        }}
                        type="button">Save</Button>}
                </ControllFormButton>}
            </ViewWorkSheet>

        </Wrapper>
    )
}

export default ResultInput