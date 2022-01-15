
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'



const VerifyResultLab = () => {
   
    const { sampleStore, commonStore } = useStore();
   
    const startLimit = useAccessWorkSheetByStatusVerify("startLimit");
    const endlimit = useAccessWorkSheetByStatusVerify('endLimit');
    //check workseheet has result =>  if not => not render handle verify button
    const hasResult = sampleStore.workSheet.samples.every(s => s.paramaters.every(p => p.result !== null))
    return (
        <Wrapper>

            <ViewWorkSheet viewOnly={true} />

           { (hasResult && (endlimit || startLimit)) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => startLimit ? 
                    sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) : 
                    sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                type='button'>{startLimit ? "Verify" : "UnVerify"}</Button>}

        </Wrapper>
    )


}

export default VerifyResultLab