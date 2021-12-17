import * as React from 'react'
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'

const ReviewReport = () => {
    const { isStatusLower } = useLimitAccessWSStatus("endLimit")
    const { sampleStore, commonStore } = useStore()
    console.log(isStatusLower)
    return (
        <Wrapper>
            <ViewWorkSheet viewOnly={true} />
            {isStatusLower && <Button disabled={commonStore.isFetching} top='50%' left='92%' onClick={() => sampleStore.generateReport(sampleStore.workSheet.workSheetNo)} type='button'>Export Report</Button>}
        </Wrapper>
    )
}

export default ReviewReport