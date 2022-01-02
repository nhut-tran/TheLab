import { strictEqual } from 'assert'
import *  as React from 'react'
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify, useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'



const VerifyResultManager = () => {
  
    const { sampleStore, commonStore } = useStore()
    const startLimit = useAccessWorkSheetByStatusVerify("startLimit");
    const endlimit = useAccessWorkSheetByStatusVerify('endLimit');
    return (
        <Wrapper>
            {<ViewWorkSheet viewOnly={true} />}

            {(startLimit || endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => startLimit ? 
                    sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) : 
                    sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                type='button'>{startLimit ? "Verify" : "UnVerify"}
            </Button>
           }
            
        </Wrapper>
    )


}

export default VerifyResultManager