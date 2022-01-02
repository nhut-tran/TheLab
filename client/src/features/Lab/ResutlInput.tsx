import { Button } from '../../App/structure/FormElement'
import ControllFormButton from '../../component/ControlFormButton'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'

import { useAccessWorkSheetByStatusVerify, useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'



const ResultInput = () => {
    const startLimit = useAccessWorkSheetByStatusVerify("startLimit");
    const endlimit = useAccessWorkSheetByStatusVerify('endLimit');
  
    return (
        <Wrapper>
            <ViewWorkSheet autoSaveName="result" viewOnly={!startLimit}>
                {(startLimit || endlimit) && <ControllFormButton>
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