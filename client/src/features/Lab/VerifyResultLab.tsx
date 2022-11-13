
import { Button } from '../../App/structure/FormElement'
import { StyleSectionHeader } from '../../App/structure/SectionHeader'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { ControlVerifyButton } from '../../component/ControllButtonNewSample'
import { useStore } from '../../store/appStore'
import { Wrapper, WrapperControlForm } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'



const VerifyResultLab = () => {

    const { sampleStore } = useStore();

    const { process, endlimit } = useAccessWorkSheetByStatusVerify();

    return (
        <Wrapper>
            <StyleSectionHeader className='section-header' size="large" content='Input Result' />
            <WrapperControlForm>
                <ViewWorkSheet viewOnly={true} />
                {/*if not in range of allow status not display control button
                process means already having results waiting for verify, endlimit means already verify */}

                {(process || endlimit) && <ControlVerifyButton
                    isVerify={process}
                    onClick={() => process ?
                        sampleStore.verifyWorkSheetResult([sampleStore.workSheet.workSheetNo]) :
                        sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                />}
            </WrapperControlForm>
        </Wrapper >
    )


}

export default VerifyResultLab