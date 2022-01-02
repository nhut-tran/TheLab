import * as React from 'react'
import { Button } from '../../App/structure/FormElement'
import { useStore } from '../../store/appStore'
import { useAccessWorkSheetByStatusVerify, useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper } from '../../style/Wrapper'


const VerifyWorkSheetReceive = () => {
   
    const startLimit = useAccessWorkSheetByStatusVerify("startLimit");
    const endlimit = useAccessWorkSheetByStatusVerify('endLimit');
    const { sampleStore, commonStore } = useStore();
  
    return (
        <Wrapper className="wrapper">

            <ViewWorkSheet viewOnly={true} />
            //if not in range of allow status not display control button
           {(startLimit || endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => startLimit ? 
                    sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) : 
                    sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                type='button'>{startLimit ? "Verify" : "UnVerify"}
            </Button>}
        </Wrapper>
    )
}

export default VerifyWorkSheetReceive