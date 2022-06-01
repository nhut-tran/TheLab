import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { history } from '../..';
import { Button } from '../../App/structure/FormElement';
import ViewWorkSheet from '../../component/ViewWorkSheet';
import { useStore } from '../../store/appStore';
import { Wrapper } from '../../style/Wrapper';



const Print = observer(() => {
    const { commonStore, sampleStore } = useStore();
    const { id } = useParams<{ id: string }>();
    return (
        <Wrapper>
            <ViewWorkSheet viewOnly={true} />
            <Button disabled={commonStore.isFetching} top='70%' left='92%'
                onClick={() => sampleStore.generayeWSPDF(sampleStore.workSheet.workSheetNo)}
                type='button'>Print
            </Button>
            <Button disabled={commonStore.isFetching} top='80%' left='92%'
                onClick={() => history.push(`/new/${id}`)}
                type='button'>Update
            </Button>
        </Wrapper>
    )
})

export default Print;