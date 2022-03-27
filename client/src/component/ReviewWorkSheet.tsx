import * as React from 'react'
import { Wrapper } from '../style/Wrapper'
import ViewWorkSheet from './ViewWorkSheet'

const ReviewWorkSheet = () => {
    return (
        <Wrapper>
            <ViewWorkSheet viewOnly={true} />
        </Wrapper>
    )

}

export default ReviewWorkSheet