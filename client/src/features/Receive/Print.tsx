import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { history } from '../..';
import { Button } from '../../App/structure/FormElement';
import { StyleSectionHeader } from '../../App/structure/SectionHeader';
import ViewWorkSheet from '../../component/ViewWorkSheet';
import { useStore } from '../../store/appStore';
import { Wrapper } from '../../style/Wrapper';



const Print = observer(() => {
    const { commonStore, sampleStore } = useStore();
    const { id } = useParams<{ id: string }>();
    return (
        <Wrapper>
            <StyleSectionHeader className='section-header' size="large" content='Print Worksheet' />
            <ViewWorkSheet viewOnly={true} />
            <Button disabled={commonStore.isFetching} top='50%' left='92%'
                onClick={() => sampleStore.generayeWSPDF(sampleStore.workSheet.workSheetNo)}
                type='button'>Print
            </Button>
            <Button disabled={commonStore.isFetching} top='60%' left='92%'
                onClick={() => history.push(`/update/${id}`)}
                type='button'>Update
            </Button>
            <Button disabled={commonStore.isFetching} top='70%' left='92%'
                onClick={() => sampleStore.deleteWorkSheet(sampleStore.workSheet.workSheetID)}
                type='button'>Delete
            </Button>
        </Wrapper>
    )
})

export default Print;