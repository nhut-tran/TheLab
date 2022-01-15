import { type } from "os"

type event = "fail" | "success"

type Listener= {
    [key in event] : ((arg: string) => void) []
}

export type Message = {
    type: event,
    message: string
}

interface Toast {
    messageQueue: Message[],
    listener: Listener
    on: (type: event, listener: (arg: string) => void) => void
    emit: (type: event, m: string) => void
    unRegister: () => void,
   
}


const toastEventRes: Toast = {
    messageQueue: [],
    listener: {
        fail: [],
        success: []
    },
    on: function (type: event, listener: (arg: string) => void) {
        if (this.listener[type]) {
            this.listener[type].push(listener)
        } else {
            this.listener[type] = [listener]
        }

    },
    emit: function (type: event, m: string) {
        if (this.listener[type]) {
            this.listener[type].forEach((lis) => {
                lis(m)
            })
        } 
    },

    unRegister: function () {
        this.listener = {
            fail: [],
            success: []
        }

    },
    
}


export default toastEventRes