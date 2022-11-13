import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { history } from '../..';
import { Button } from '../../App/structure/FormElement';
import { StyleSectionHeader } from '../../App/structure/SectionHeader';
import { ControlPrintWorkSheet } from '../../component/ControllButtonNewSample';
import ViewWorkSheet from '../../component/ViewWorkSheet';
import { useStore } from '../../store/appStore';
import { Wrapper, WrapperControlForm } from '../../style/Wrapper';



const Print = observer(() => {
    const { commonStore, sampleStore } = useStore();
    const { id } = useParams<{ id: string }>();
    return (
        <Wrapper>
            <StyleSectionHeader className='section-header' size="large" content='Print Worksheet' />
            <WrapperControlForm>
                <ViewWorkSheet viewOnly={true} />
                <ControlPrintWorkSheet
                    onClickPrint={() => sampleStore.generayeWSPDF(sampleStore.workSheet.workSheetNo)}
                    onClickUpdate={() => history.push(`/update/${id}`)}
                    onClickDelete={() => sampleStore.deleteWorkSheet(sampleStore.workSheet.workSheetID)}
                />
            </WrapperControlForm>
        </Wrapper>
    )
})

export default Print;