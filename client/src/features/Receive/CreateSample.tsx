import { useLayoutEffect, useState } from "react";
import { observer } from 'mobx-react-lite'
import { useStore } from "../../store/appStore";
import { Spinner } from "../../style/Spinner";
import { useParams, useRouteMatch } from "react-router-dom";
import { history } from "../..";
import { useRef } from "react";
import { WorkSheet } from "../../api/entity";
import WorkSheetForm from "../../component/WorkSheetForm";
import { Wrapper } from "../../style/Wrapper";
import { Modal } from "../../App/structure/Modal";
import { StyleSectionHeader } from "../../App/structure/SectionHeader";



const CreateSample = observer(() => {
    const { sampleStore, commonStore } = useStore();
    const matchEdit = useRouteMatch('/new/:id')
    const { id } = useParams<{ id: string }>()
    const saveStatus = useRef(false);
    const [display, setDisplay] = useState(false)
    const handleSubmit = (val: WorkSheet) => {
        saveStatus.current = true
        if (!matchEdit?.isExact) {

            sampleStore.UpdateSample(val)
        } else {

            sampleStore.CreateSample(val)
        }
    }
    useLayoutEffect(() => {

        let unBlock = history.block(() => {

            if (saveStatus.current) {
                return unBlock()
            }

            if (!display) {
                setDisplay(true)
            }

            return false
        })
        if (saveStatus.current) {
            history.goBack()
        }
        return () => {
            unBlock()
        }

    }, [display])

    useLayoutEffect(() => {
        //fectch data when data not avaliable: user reload page
        if (!sampleStore.workSheet.workSheetNo) {
            sampleStore.getWorkSheet(id)

        }
        window.onbeforeunload = function () {
            return "save before leave";
        };
        return () => {
            window.onbeforeunload = function () {

            }
        }
    }, [])



    if (!sampleStore.workSheet.workSheetNo) {
        return (
            <Wrapper className='wrapper'>
                <Spinner isDisPlay={commonStore.isFetching}><h3>Loading .......</h3></Spinner>
            </Wrapper>
        )
    }

    return (
        <Wrapper className='wrapper'>

            <StyleSectionHeader className='section-header' size="large" content='Create Sample' />
            {
                display && <Modal className='modal' setDisplay={setDisplay} saveStatus={saveStatus} />
            }
            <WorkSheetForm handleSubmit={handleSubmit} />

        </Wrapper>
    )

})

export default CreateSample