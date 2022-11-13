import { Button } from '../../App/structure/FormElement'
import { StyleSectionHeader } from '../../App/structure/SectionHeader'
import ControllFormButton from '../../component/ControlFormButton'
import { ControllButtonInputResult } from '../../component/ControllButtonNewSample'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper, WrapperControlForm } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'
import { microResultValidate } from '../../utils/validation/resultValidation'



const ResultInput = () => {
    const { process } = useAccessWorkSheetByStatusVerify();
    return (
        <Wrapper>

            <StyleSectionHeader className='section-header' size="large" content='Input Result' />
            {/*allow for input if only in proccess status*/}
            <WrapperControlForm>
                <ViewWorkSheet autoSaveName="result" limit={3}>
                    {process && <ControllButtonInputResult />}
                </ViewWorkSheet>
            </WrapperControlForm>
        </Wrapper >
    )
}

export default ResultInput