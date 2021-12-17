import { useState } from 'react'
import { ReactComponent as Eye } from '../utils/eye.svg'
import { ReactComponent as EyeClose } from '../utils/eyeclose.svg'

interface Prop {
    setShow: () => void,
    show: boolean
}


export const ShowPassword = ({ show, setShow }: Prop) => {
    const style = { marginTop: '-2.2rem', marginRight: '2px', alignSelf: 'end', opacity: 0.2, cursor: 'pointer' }
    return (
        show ? <Eye onClick={setShow} style={style} />
            : <EyeClose onClick={setShow} style={style} />
    )
}