import *  as React from 'react'
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'



const VerifyResultManager = () => {
    const { isStatusLowerOrEqual, isStatusEqual, handleVerify } = useLimitAccessWSStatus("startLimit")
    const [wantModify, setWantModify] = React.useState(false)
    const { sampleStore } = useStore()

    return (
        <Wrapper>
            {<ViewWorkSheet viewOnly={!wantModify} />}

            {(isStatusLowerOrEqual || wantModify) && <Button top='50%' left='92%'
                onClick={() => handleVerify(isStatusEqual ? sampleStore.workSheet.workSheetNo : [sampleStore.workSheet.workSheetNo])}
                type='button'>{isStatusEqual ? "Unverify" : "Verify"}
            </Button>}
            <Button top='70%' left='92%'
                onClick={() => setWantModify(!wantModify)}
                type='button'>{!wantModify ? "Modify" : "ViewOnly"}
            </Button>
        </Wrapper>
    )


}

export default VerifyResultManager