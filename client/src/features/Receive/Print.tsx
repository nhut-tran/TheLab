import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react'
import { Button } from '../../App/structure/FormElement';
import ViewWorkSheet from '../../component/ViewWorkSheet';
import { useStore } from '../../store/appStore';
import { Wrapper } from '../../style/Wrapper';



const Print = observer(() => {
    const {commonStore, sampleStore} = useStore();
    console.log(toJS(sampleStore.workSheet))
    return (
       <Wrapper>
            <ViewWorkSheet viewOnly={true} />
            <Button disabled={commonStore.isFetching} top='70%' left='92%'
                    onClick={() => sampleStore.generayeWSPDF(sampleStore.workSheet.workSheetNo)}
                    type='button'>Print
            </Button>
        </Wrapper>
    )
})

export default Print;