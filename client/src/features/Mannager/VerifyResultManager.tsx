import { } from 'mobx'
import { useRef, useState } from 'react'
import { Button } from '../../App/structure/FormElement'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'



const VerifyResultManager = () => {

    const { sampleStore, commonStore } = useStore();
    const { startlimit, endlimit } = useAccessWorkSheetByStatusVerify();
    const [buttonToggle, setButtonToggle] = useState(false);
    const ref = useRef({ ...sampleStore.workSheet })

    return (
        <Wrapper>
            {<ViewWorkSheet viewOnly={true} />}

            {(startlimit || endlimit) && <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => startlimit ?
                    sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) :
                    sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                type='button'>{startlimit ? "Verify" : "UnVerify"}
            </Button>

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

export default VerifyResultManager