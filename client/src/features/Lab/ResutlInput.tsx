import { Button } from '../../App/structure/FormElement'
import ControllFormButton from '../../component/ControlFormButton'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper } from '../../style/Wrapper'

import { useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'



const ResultInput = () => {
    const { isStatusLowerOrEqual } = useLimitAccessWSStatus("endLimit")
    const startLimit = useLimitAccessWSStatus("startLimit")

    return (
        <Wrapper>
            <ViewWorkSheet autoSaveName="result" viewOnly={!startLimit.isStatusEqual || !isStatusLowerOrEqual}>
                <ControllFormButton>
                    {({ submitForm }) => <Button className='form_button' top='60%' left='92%'
                        onClick={() => {
                            
                            submitForm()
                        }}
                        type="button">Save</Button>}
                </ControllFormButton>
            </ViewWorkSheet>

        </Wrapper>
    )
}

export default ResultInput