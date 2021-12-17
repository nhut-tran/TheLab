import * as React from 'react'
import { WorkSheet } from '../api/entity'
import { StyleLink } from '../style/List'
import { WrapperForList } from '../style/Wrapper'

interface Prop {
    data: WorkSheet[],
    handleClick: (id: string) => void,
    link: string
}

const List = ({ data, handleClick, link }: Prop) => {

    return (
        <WrapperForList width='100%'>
            {
                data && data.map((v, index) => <StyleLink strip={index} key={v.workSheetNo} onClick={() => handleClick(v.workSheetNo)} to={`${link}/${v.workSheetNo}`}>{v.workSheetNo}</StyleLink>)
            }
        </WrapperForList>
    )
}

export default List