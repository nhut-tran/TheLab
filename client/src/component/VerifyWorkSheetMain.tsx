import { Wrapper } from '../style/Wrapper';
import { Button } from '../App/structure/FormElement';
import { useStore } from '../store/appStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import { useRouteMatch } from 'react-router';
import { useSearchResultHanlde } from '../utils/useSearchListHandle';
import { StyleSectionHeader } from '../App/structure/SectionHeader';



const VerifyMain = observer(() => {
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
            <StyleSectionHeader className='section-header' size="large" content='Verify WorkSheet' />
            <SearchInput />

            <Button marginTop='1rem' position='relative'
                onClick={() => {

                    commonStore.getUnApproveWorkSheet(false);
                }}
                type='button'>Get WorkSheet Verify</Button>

            <SearchResult link={url} data={commonStore.searchData}
                handleClick={commonStore.getSearchValue}
                handleCheck={handleApproveList} />

            {approveList.length > 1 && <Button top='40%' left='92%' type='button' onClick={() => sampleStore.verifyWorkSheet(approveList)}>Verify All</Button>}
        </Wrapper>
    )
})

export default VerifyMain