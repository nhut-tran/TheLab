import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyleSectionHeader } from '../../App/structure/SectionHeader'
import { ControlManagerVerifyWorkSheet } from '../../component/ControllButtonNewSample'
import ViewWorkSheet from '../../component/ViewWorkSheet'
import { useStore } from '../../store/appStore'
import { Wrapper, WrapperControlForm } from '../../style/Wrapper'
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
            <WrapperControlForm>
                <ViewWorkSheet viewOnly={true} />
                <ControlManagerVerifyWorkSheet
                    isDisplayVerify={startlimit || endlimit}
                    isCheckNewData={checkDataButtonToggle}
                    isVerify={startlimit}
                    onClickVerify={() => startlimit ?
                        sampleStore.verifyWorkSheet([sampleStore.workSheet.workSheetNo]) :
                        sampleStore.unVerifyWorkSheet(sampleStore.workSheet.workSheetNo)}
                    onClickCheckNewData={() => {
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
                    onClickAllparamater={() => {
                        !buttonToggle ? commonStore.search({ Worksheet: sampleStore.workSheet.workSheetNo, WorkSheet_BySample: "" })
                            : sampleStore.setWorkSheetValue(ref.current)

                        setButtonToggle((prev) => {
                            return !prev;
                        });
                    }}
                />
            </WrapperControlForm>
        </Wrapper>
    )


}

export default VerifyResultManager