import { observer } from 'mobx-react-lite'
import { WorkSheet } from '../api/entity'
import { useStore } from '../store/appStore'
import { StyleLink } from '../style/List'
import { WrapperForList } from '../style/Wrapper'
import { WorkSheetStatusLimitAccess } from '../config/WorkSheetStatus'
import ListItemWithCheck from './ListItemWithCheck'
import PageGination from './Pagination'

interface Prop {
    link: string,

    handleClick: (id: string) => void,
    handleCheck?: (value: string, addorsub: boolean) => void,
    data: WorkSheet[]
}

const SearchResult = observer(({ link, data, handleClick, handleCheck }: Prop) => {

    const { userStore, commonStore } = useStore()

    return (

        <WrapperForList width='50%'>
            {
                data && data.map((v, ind) => {
                    if (handleCheck) {
                        return (
                            <ListItemWithCheck
                                key={ind}
                                index={ind}
                                displayValue={v.workSheetNo}
                                value={v.workSheetNo}
                                handleCheck={handleCheck}
                                handleClick={handleClick}
                                link={link}
                                status={!(userStore.user && v.status < WorkSheetStatusLimitAccess.endLimit[userStore.user.department])}
                            />
                        )
                    } else {
                        return (
                            <StyleLink className='listItem' strip={ind} key={v.workSheetNo}
                                onClick={() => handleClick(v.workSheetNo)}
                                to={`${link}/${v.workSheetNo}`}
                            >
                                {v.workSheetNo}
                            </StyleLink>
                        )
                    }
                })
            }
            {data.length > 0 && commonStore.metadata && commonStore.metadata.totalItem > 10 && <PageGination totalPage={10} />}
        </WrapperForList>

    )
})

export default SearchResult