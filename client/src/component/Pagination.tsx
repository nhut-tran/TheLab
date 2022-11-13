import { useRouteMatch } from 'react-router'
import { useStore } from '../store/appStore'
import { StyleLink } from '../style/List'

interface Prop {
    totalPage: number,
    currentPage: number
}
const PageGination = () => {
    const { commonStore } = useStore();

    const { url } = useRouteMatch();
    if (commonStore.metadata) {
        const { currentPage, pageCount: totalPage } = commonStore.metadata as { currentPage: number, pageCount: number }
        return (
            <div style={{ display: 'flex', width: '100% ' }}>
                <StyleLink className='page_link' onClick={() => {
                    if (currentPage > 1)
                        commonStore.getUnApproveWorkSheet(false, (currentPage - 1).toString())
                }}
                    to={'#'}>{'<<'}</StyleLink>
                {Array.from(Array(totalPage).keys()).map(page => (
                    <StyleLink selected={currentPage === (page + 1)} className='page_link' onClick={() => { commonStore.getUnApproveWorkSheet(false, (page + 1).toString()) }}
                        to={url}>{page + 1}</StyleLink>
                ))}
                <StyleLink className='page_link' onClick={() => {
                    if (currentPage < totalPage)
                        commonStore.getUnApproveWorkSheet(false, (currentPage + 1).toString())

                }}
                    to={'#'}>{'>>'}</StyleLink>
            </div>
        )
    }

    return null;
}

export default PageGination