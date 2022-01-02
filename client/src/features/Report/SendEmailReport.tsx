import { Button } from "../../App/structure/FormElement";
import ViewWorkSheet from "../../component/ViewWorkSheet";
import { useStore } from "../../store/appStore";
import { Wrapper } from "../../style/Wrapper";
import { useAccessWorkSheetByStatusVerify } from "../../utils/useLimitAccessWSStatus";

const SendEmailReport = () => {
   
    const endlimit = useAccessWorkSheetByStatusVerify('endLimit');
    const { customerStore, commonStore, sampleStore } = useStore()
    return ( 
        <Wrapper>
            <ViewWorkSheet viewOnly={true} />
            {(endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
            onClick={() => customerStore.sendEmail(sampleStore.workSheet.workSheetNo, 'report')} type='button'>Send Email Report</Button>
            }
        </Wrapper>
    )
}

export default SendEmailReport