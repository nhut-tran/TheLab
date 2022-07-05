import * as React from 'react'
import { Button } from '../../App/structure/FormElement'
import { useStore } from '../../store/appStore'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper } from '../../style/Wrapper'
import { StyleSectionHeader } from '../../App/structure/SectionHeader'


const VerifyWorkSheetReceive = () => {

    const { startlimit, endlimit } = useAccessWorkSheetByStatusVerify()
    const { sampleStore, commonStore } = useStore();

    return (
        <Wrapper className="wrapper">
            <StyleSectionHeader className='section-header' size="large" content='Verify Worksheet' />
            <ViewWorkSheet viewOnly={true} />
            //if not in range of allow status not display control button
            {(startlimit || endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => startlimit ?
                    sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) :
                    sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                type='button'>{startlimit ? "Verify" : "UnVerify"}
            </Button>}
        </Wrapper>
    )
}

export default VerifyWorkSheetReceive