import * as React from 'react'

import { useToast } from '../../utils/toaster/useToast'

import ErrorToaster from './ErrorToaster'


const ToasterContainer = () => {
    const { message } = useToast()

    if (message.length > 0) {
        return (
            <>
                {
                    message.map((el, ind) => {

                        return <ErrorToaster key={ind} ind={ind} className='nhut' position={((ind + 1) * 10).toString() + '%'}>{el}</ErrorToaster>
                    })
                }
            </>
        )
    }

    return null

}

export default ToasterContainer