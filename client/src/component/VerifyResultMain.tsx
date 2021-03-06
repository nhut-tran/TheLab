import { GridCenter, Wrapper } from '../style/Wrapper';
import { Button } from '../App/structure/FormElement';
import { useStore } from '../store/appStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import { useRouteMatch } from 'react-router';

import { useSearchResultHanlde } from '../utils/useSearchListHandle';
import { StyleSectionHeader } from '../App/structure/SectionHeader';


const VerifyResultMain = observer(() => {
    const { commonStore, sampleStore } = useStore()
    const [approveList, setApproveList] = useSearchResultHanlde();
    const { url } = useRouteMatch()


    const handleApproveList = (value: string, addorsub: boolean) => {

        setApproveList({ value: value, type: addorsub })

    }

    useEffect(() => {
        return () => {
            commonStore.resetSearchValue()

        }
    }, [commonStore])


    return (
        <Wrapper>
            <StyleSectionHeader className='section-header' size="large" content='Verify Result' />
            <SearchInput />

            <Button marginTop='1rem' position='relative'
                disabled={commonStore.isFetching}
                onClick={() => {
                    commonStore.getUnApproveWorkSheet(true);
                }}
                type='button'>Get Result verify</Button>


            <SearchResult link={url} data={commonStore.searchData}
                handleClick={commonStore.getSearchValue}
                handleCheck={handleApproveList} />
            {approveList.length > 1 && <Button position='relative' disabled={commonStore.isFetching} onClick={() => sampleStore.verifyWorkSheet(approveList)} type='button'>Verify All</Button>}
        </Wrapper>
    )
})

export default VerifyResultMain