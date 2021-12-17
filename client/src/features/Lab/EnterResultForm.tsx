import { Wrapper } from "../../style/Wrapper";
import { observer } from 'mobx-react-lite'
import { useStore } from "../../store/appStore";
import { Spinner } from "../../style/Spinner";
import ViewWorkSheet from "../../component/ViewWorkSheet";


interface Prop {
    viewOnly: boolean

}


const EnterResultForm = observer(({ viewOnly }: Prop) => {
    const { sampleStore, commonStore } = useStore();


    if (!sampleStore.workSheet.workSheetNo) {
        return <Spinner isDisPlay={commonStore.isFetching}><h3>Loading .......</h3></Spinner>
    }
    return (
        <>
            <Spinner isDisPlay={commonStore.isFetching}><h3>Loading .......</h3></Spinner>
            <Wrapper>
                <ViewWorkSheet viewOnly={viewOnly} />
            </Wrapper>
        </>
    )
})

export default EnterResultForm

//(values.status < 3 && !viewOnly)