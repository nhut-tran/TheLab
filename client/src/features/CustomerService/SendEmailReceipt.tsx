import * as React from 'react'
import { Button } from '../../App/structure/FormElement'
import { useStore } from '../../store/appStore'
import { useLimitAccessWSStatus } from '../../utils/useLimitAccessWSStatus'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { Wrapper } from '../../style/Wrapper'


const SendEmailReceipt = () => {
    const { isStatusLowerOrEqual } = useLimitAccessWSStatus("endLimit")

    const { customerStore, commonStore, sampleStore } = useStore()
  
    return (
        <Wrapper className="wrapper">

            <ViewWorkSheet viewOnly={true} />

            {isStatusLowerOrEqual && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => {customerStore.sendEmail(sampleStore.workSheet.workSheetNo)}}
                type='button'>Send Email
            </Button>}
            
        </Wrapper>
    )
}

export default SendEmailReceipt