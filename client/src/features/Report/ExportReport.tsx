import * as React from 'react'
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'

const ExportReport = () => {

    const { startlimit, endlimit } = useAccessWorkSheetByStatusVerify();
    const { sampleStore, commonStore } = useStore();
    const [buttonToggle, setButtonToggle] = React.useState(false);
    const ref = React.useRef({ ...sampleStore.workSheet })

    return (
        <Wrapper>
            <ViewWorkSheet viewOnly={true} />
            {
                (startlimit || endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%' onClick={() => sampleStore.generateReport(sampleStore.workSheet.workSheetNo)} type='button'>Export Report</Button>
            }
            <Button disabled={commonStore.isFetching} top='60%' left='92%'
                onClick={() => {
                    !buttonToggle ? commonStore.search({ Worksheet: sampleStore.workSheet.workSheetNo, WorkSheet_BySample: "" })
                        : sampleStore.setWorkSheetValue(ref.current)

                    setButtonToggle((prev) => {
                        return !prev;
                    });
                }}
                type='button'> {!buttonToggle ? "All parameters" : "Hide verified parameter"}
            </Button>
        </Wrapper>
    )
}

export default ExportReport