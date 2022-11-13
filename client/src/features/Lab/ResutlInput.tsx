import { StyleSectionHeader } from '../../App/structure/SectionHeader'
import { ControllButtonInputResult } from '../../component/ControllButtonNewSample'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper, WrapperControlForm } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'



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