import { Button } from "../../App/structure/FormElement";
import ViewWorkSheet from "../../component/ViewWorkSheet";
import { useStore } from "../../store/appStore";
import { Wrapper } from "../../style/Wrapper";
import { useAccessWorkSheetByStatusVerify } from "../../utils/useLimitAccessWSStatus";

const SendEmailReceipt = () => {
    const startLimit = useAccessWorkSheetByStatusVerify('startLimit');
    const endlimit = useAccessWorkSheetByStatusVerify('endLimit');
    const { sampleStore, commonStore, customerStore } = useStore()
    return ( 
        <Wrapper>
            <ViewWorkSheet viewOnly={true} />
            {(startLimit ) && <Button disabled={commonStore.isFetching} top='50%' left='92%' onClick={() => customerStore.sendEmail(sampleStore.workSheet.workSheetNo, 'receipt')} type='button'>Send Email Receipt</Button>}
        </Wrapper>
    )
}

export default SendEmailReceipt