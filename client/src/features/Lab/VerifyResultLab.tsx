
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'



const VerifyResultLab = () => {
   
    const { sampleStore, commonStore } = useStore();
   
    const {process, endlimit} = useAccessWorkSheetByStatusVerify();
    //check workseheet has result =>  if not => not render handle verify button
    const hasResult = sampleStore.workSheet.samples.every(s => s.paramaters.every(p => p.result !== null))
    return (
        <Wrapper>

            <ViewWorkSheet viewOnly={true} />
            //if not in range of allow status not display control button
            //process means already having results waiting for verify, endlimit means already verify
           { (hasResult && (process || endlimit)) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => process ? 
                    sampleStore.verifyWorkSheetResult([sampleStore.workSheet.workSheetNo]) : 
                    sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                type='button'>{process ? "Verify" : "UnVerify"}</Button>}

        </Wrapper>
    )


}

export default VerifyResultLab