import { useToast } from '../../utils/toaster/useToast'
import Toaster from './Toaster'


const ToasterContainer = () => {
    const { message } = useToast()

    if (message.length > 0) {
        return (
            <>
                {
                    message.map((el, ind) => {

                        return <Toaster type={el.type} key={ind} ind={ind} className='toaster' position={((ind + 1) * 10).toString() + '%'}>{el.message}</Toaster>
                    })
                }
            </>
        )
    }

    return null

}

export default ToasterContainer