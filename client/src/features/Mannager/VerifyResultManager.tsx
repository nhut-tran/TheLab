import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../App/structure/FormElement'
import { StyleSectionHeader } from '../../App/structure/SectionHeader'
import ViewWorkSheet from '../../component/ViewWorkSheet'

import { useStore } from '../../store/appStore'
import { Wrapper } from '../../style/Wrapper'
import { useAccessWorkSheetByStatusVerify } from '../../utils/useLimitAccessWSStatus'



const VerifyResultManager = () => {
    const { id } = useParams<{ id: string }>();
    const { sampleStore, commonStore } = useStore();
    const { startlimit, endlimit } = useAccessWorkSheetByStatusVerify();
    const [buttonToggle, setButtonToggle] = useState(false);
    const [checkDataButtonToggle, setCheckDataButtonToggle] = useState(true);
    const ref = useRef({ ...sampleStore.workSheet })

    return (
        <Wrapper>
            <StyleSectionHeader className='section-header' size="large" content='Verify Result' />
            {<ViewWorkSheet viewOnly={true} />}

            {(startlimit || endlimit) && <Button disabled={commonStore.isFetching || checkDataButtonToggle} top='50%' left='92%'
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
            {checkDataButtonToggle && <Button disabled={commonStore.isFetching} top='80%' left='92%'
                onClick={() => {

                    commonStore.getUnApproveWorkSheet(false).then(() => {
                        const ws = commonStore.searchData.find(e => e.workSheetNo == id);
                        if (ws)
                            sampleStore.setWorkSheetValue(ws);
                        setCheckDataButtonToggle(false);
                        //if five second after update data not verify => have to check again
                        setTimeout(() => {
                            setCheckDataButtonToggle(true);
                        }, 5000);
                    })
                }}
                type='button'>Check new data
            </Button>}
        </Wrapper>
    )


}

export default VerifyResultManager