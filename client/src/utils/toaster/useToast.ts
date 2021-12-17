import React, { useEffect, useRef, useState } from "react"
import toastEventRes from "./Toaster"


export const useToast = () => {

    const [message, setMessage] = React.useState<string[]>([])
    const refTime = useRef(0)
    let clock = useRef<NodeJS.Timeout>()
    const [refActiveClock, setCLock] = useState(false)

    const setMessageWrap = (m: string) => {

        setMessage((prev) => {


            if (prev.length < 3) {
                refTime.current = Date.now()
                if (prev.length === 2) {

                    setCLock(true)
                }
                return [...prev, m]
            }
            else {

                toastEventRes.messageQueue.push(m)

                setCLock(true)

                return [...prev]
            }
        })

    }

    React.useEffect(() => {

        toastEventRes.on('fail', setMessageWrap)
        return () => {
            toastEventRes.unRegister()
        }
    }, [])
    useEffect(() => {

        if (refActiveClock) {
            if (clock.current) {

                clearInterval(clock.current)
            }
            clock.current = setInterval(() => {

                if (refTime.current + 4000 < Date.now()) {

                    setMessage((prev) => {
                        const newState = [...prev]
                        newState.shift()
                        if (prev.length === 0 && toastEventRes.messageQueue.length > 0) {

                            refTime.current = Date.now()

                            return [...toastEventRes.messageQueue.splice(0, 3)]
                        }
                        else if (prev.length === 0 && toastEventRes.messageQueue.length === 0) {


                            setCLock(false)

                            return []
                        }

                        return [...newState]

                    })

                }
            }, 100)

        } else {

            if (clock.current) clearInterval(clock.current)

        }

        return () => {
            if (clock.current) clearInterval(clock.current)
        }

    }, [refActiveClock])
    return { message, setMessageWrap, setMessage }
}


