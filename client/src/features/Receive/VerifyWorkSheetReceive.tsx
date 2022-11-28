import { useStore } from '../../store/appStore'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper, WrapperControlForm } from '../../style/Wrapper'
import { StyleSectionHeader } from '../../App/structure/SectionHeader'
import { ControlVerifyButton } from '../../component/ControllButtonNewSample'


const VerifyWorkSheetReceive = () => {

    const { startlimit, endlimit } = useAccessWorkSheetByStatusVerify()
    const { sampleStore } = useStore();

    return (
        <Wrapper className="wrapper">

            <StyleSectionHeader className='section-header' size="large" content='Verify Worksheet' />
            <WrapperControlForm>
                <ViewWorkSheet viewOnly={true} />

                {/* {(startlimit || endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => startlimit ?
                    sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) :
                    sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                type='button'>{startlimit ? "Verify" : "UnVerify"}
            </Button>} */}
                {(startlimit || endlimit) && <ControlVerifyButton
                    isVerify={startlimit}
                    onClick={() => startlimit ?
                        sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) :
                        sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                />}
            </WrapperControlForm>
        </Wrapper>
    )
}

export default VerifyWorkSheetReceive