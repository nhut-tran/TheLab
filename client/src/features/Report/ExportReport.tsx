import * as React from 'react'
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'

const ExportReport = () => {
   
    const {startlimit, endlimit} = useAccessWorkSheetByStatusVerify()
    const { sampleStore, commonStore } = useStore()
    return (
        <Wrapper>
            <ViewWorkSheet viewOnly={true} />
            {(startlimit || endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%' onClick={() => sampleStore.generateReport(sampleStore.workSheet.workSheetNo)} type='button'>Export Report</Button>
            }
        </Wrapper>
    )
}

export default ExportReport