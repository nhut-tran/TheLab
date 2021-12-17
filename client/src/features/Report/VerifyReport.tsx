import * as React from 'react'
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'

const ReviewReport = () => {
    const { isStatusLowerOrEqual, isStatusEqual, handleVerify } = useLimitAccessWSStatus("endLimit")
    const { sampleStore } = useStore()

    return (
        <Wrapper>
            <ViewWorkSheet viewOnly={true} />
            {isStatusLowerOrEqual && <Button top='50%' left='92%'
                onClick={() => handleVerify([sampleStore.workSheet.workSheetNo])}
                type='button'>{isStatusEqual ? "Unverify" : "Verify"}
            </Button>}
        </Wrapper>

    )
}

export default ReviewReport