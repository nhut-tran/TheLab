import { observer } from 'mobx-react-lite'
import { WorkSheet } from '../api/entity'
import { useStore } from '../store/appStore'
import { StyleLink } from '../style/List'
import { WrapperForList } from '../style/Wrapper'
import { WorkSheetStatusLimitAccess } from '../config/WorkSheetStatus'
import ListItemWithCheck from './ListItemWithCheck'
import PageGination from './Pagination'
import { ButtonLink } from '../style/Link'
import { Table } from '../style/Table'
import { useRouteMatch } from 'react-router-dom'

interface Prop {
    link: string,
    handleClick: (id: string) => void,
    handleCheck?: (value: string, addorsub: boolean) => void,
    data: WorkSheet[]
}

const SearchResult = observer(({ link, data, handleClick, handleCheck }: Prop) => {

    const { userStore } = useStore()
    const { url } = useRouteMatch()
    return (
        <div>
            {data.length > 0 && <>

                <Table className="methodTable">

                    <tr>
                        <th>WorkSheetNo</th>
                        <th>Customer</th>
                        <th>Receive Date</th>
                        <th>Turn Around day</th>
                        <th>Status</th>
                        <th>Department</th>
                    </tr>
                    {

                        data.map(w => {
                            return (
                                <tr>
                                    <td><StyleLink
                                        to={`${url}/${w.workSheetNo}`}
                                        onClick={() => { }}
                                    >{w.workSheetNo}</StyleLink></td>
                                    <td>{w.issueTo}</td>
                                    <td>{w.receiveDate}</td>
                                    <td>{w.resultDate}</td>
                                    <td>{w.status}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        })

                    }
                </Table>
            </>}
        </div>
        // <WrapperForList width='50%'>
        //     {
        //         data && data.map((v, ind) => {
        //             if (handleCheck) {
        //                 return (
        //                     <ListItemWithCheck
        //                         key={ind}
        //                         index={ind}
        //                         displayValue={v.workSheetNo}
        //                         value={v.workSheetNo}
        //                         handleCheck={handleCheck}
        //                         handleClick={handleClick}
        //                         link={link}
        //                         status={!(userStore.user && (WorkSheetStatusLimitAccess[userStore.user.department].startlimit <= v.status && v.status <= WorkSheetStatusLimitAccess[userStore.user.department].endlimit))}
        //                     />
        //                 )
        //             } else {
        //                 return (
        //                     <StyleLink className='listItem' key={v.workSheetNo}
        //                         onClick={() => handleClick(v.workSheetNo)}
        //                         to={`${link}/${v.workSheetNo}`}
        //                     >
        //                         {v.workSheetNo}
        //                     </StyleLink>
        //                 )
        //             }
        //         })
        //     }
        //     {data.length > 0 && <PageGination />}
        // </WrapperForList>

    )
})

export default SearchResult