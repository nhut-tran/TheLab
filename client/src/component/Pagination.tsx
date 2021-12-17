import * as React from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { useStore } from '../store/appStore'
import { StyleLink } from '../style/List'

interface Prop {
    totalPage: number
}
const PageGination = ({ totalPage }: Prop) => {
    const { commonStore } = useStore()
    const { url } = useRouteMatch()

    const [currentPage, setCurrentPage] = React.useState(1)
    const [skip, setSkip] = React.useState(1)
    return (
        <div style={{ display: 'flex', width: '100% ' }}>
            <StyleLink strip={1} className='page_link' onClick={() => {
                setCurrentPage((prev) => {
                    if (prev >= 1) {


                        commonStore.getUnApproveWorkSheet(false, (prev - 1).toString())
                        setSkip((prev) => {
                            if (prev >= 2) {
                                return prev - 1
                            }
                            return prev
                        })
                        return prev - 1
                    }
                    return prev
                })

            }}
                to={'#'}>{'<<'}</StyleLink>
            {Array.from(Array(6).keys()).map(page => (
                <StyleLink strip={(page + skip) === (commonStore.metadata.currentPage) ? 0 : 1} className='page_link' onClick={() => { commonStore.getUnApproveWorkSheet(false, (page + skip).toString()) }}
                    to={url}>{(page + skip) > commonStore.metadata.pageCount ? "" : page + skip}</StyleLink>
            ))}
            <StyleLink strip={1} className='page_link' onClick={() => {


                setCurrentPage((prev) => {

                    if (prev <= commonStore.metadata.pageCount) {


                        commonStore.getUnApproveWorkSheet(false, (prev + 1).toString())

                        if (prev + 5 <= commonStore.metadata.pageCount) {
                            setSkip((prev) => {

                                return prev + 1

                            })
                        }

                        return prev + 1
                    }
                    return prev
                })
            }

            }
                to={'#'}>{'>>'}</StyleLink>
        </div>
    )
}

export default PageGination