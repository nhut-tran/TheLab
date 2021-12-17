import * as React from 'react'
import { Button } from '../../App/structure/FormElement'
import { useStore } from '../../store/appStore'
import { useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper } from '../../style/Wrapper'


const VerifyWorkSheetReceive = () => {
    const { isStatusLowerOrEqual, isStatusEqual, handleVerify } = useLimitAccessWSStatus("endLimit")

    const { sampleStore, commonStore } = useStore()
    let  data: string;
    React.useEffect(() => {
        data = document.body.innerHTML;
        console.log(data)
    }, [])
    return (
        <Wrapper className="wrapper">

            <ViewWorkSheet autoSaveName={'nhut'} viewOnly={true} />

            {isStatusLowerOrEqual && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => handleVerify(isStatusEqual ? sampleStore.workSheet.workSheetNo : [sampleStore.workSheet.workSheetNo])}
                type='button'>{isStatusEqual ? "Unverify" : "Verify"}
            </Button>}
            <Button disabled={commonStore.isFetching} top='70%' left='92%'
                onClick={() => sampleStore.generayeWSPDF(sampleStore.workSheet.workSheetNo)}
                type='button'>Print
            </Button>
        </Wrapper>
    )
}

export default VerifyWorkSheetReceive