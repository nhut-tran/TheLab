import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'


const VerifyWorkSheetLab = () => {
    const { isStatusLowerOrEqual, isStatusEqual, handleVerify } = useLimitAccessWSStatus("startLimit")
    const endLimit = useLimitAccessWSStatus("endLimit")


    const { sampleStore } = useStore()
 
    return (
        <Wrapper>
            {<ViewWorkSheet  viewOnly={isStatusLowerOrEqual || !endLimit.isStatusLower} />}

            {isStatusLowerOrEqual && <Button top='50%' left='92%'
                onClick={() => handleVerify(isStatusEqual ? sampleStore.workSheet.workSheetNo : [sampleStore.workSheet.workSheetNo])}
                type='button'>{isStatusEqual ? "Unverify" : "Verify"}
            </Button>}

        </Wrapper>
    )

    // return (
    //     <>
    //         <EnterResult viewOnly={true} />
    //         <Button disabled={sampleStore.workSheet.status > 3} top='50%' left='92%' onClick={() => sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo])} type='button'>Verify</Button>
    //     </>
    // )
}

export default VerifyWorkSheetLab