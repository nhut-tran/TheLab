import { strictEqual } from 'assert'
import *  as React from 'react'
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'



const VerifyResultManager = () => {
  
    const { sampleStore, commonStore } = useStore()
    const {startlimit, endlimit} = useAccessWorkSheetByStatusVerify()
    return (
        <Wrapper>
            {<ViewWorkSheet viewOnly={true} />}

            {(startlimit || endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => startlimit ? 
                    sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) : 
                    sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                type='button'>{startlimit ? "Verify" : "UnVerify"}
            </Button>
           }
            
        </Wrapper>
    )


}

export default VerifyResultManager