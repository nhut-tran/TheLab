
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'



const VerifyResultLab = () => {
    const { isStatusLowerOrEqual, isStatusEqual, handleVerify } = useLimitAccessWSStatus("endLimit")

    const { sampleStore } = useStore()
    //check workseheet has result =>  if not => not render handle verify button
    const hasResult = sampleStore.workSheet.samples.every(s => s.paramaters.every(p => p.result !== null))
    return (
        <Wrapper>

            <ViewWorkSheet viewOnly={true} />

            {(isStatusLowerOrEqual && hasResult) && <Button top='50%' left='92%'
                onClick={() => handleVerify(isStatusEqual ? sampleStore.workSheet.workSheetNo : [sampleStore.workSheet.workSheetNo])}
                type='button'>{isStatusEqual ? "Unverify" : "Verify"}
            </Button>}

        </Wrapper>
    )


}

export default VerifyResultLab