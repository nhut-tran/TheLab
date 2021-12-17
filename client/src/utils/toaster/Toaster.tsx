

interface Listener {
    [key: string]: [(arg: string) => void]
}

interface Toast {
    messageQueue: string[],

    listener: Listener
    on: (type: string, listener: (arg: string) => void) => void
    emit: (type: string, m: string) => void
    unRegister: () => void
}


const toastEventRes: Toast = {
    messageQueue: [],

    listener: {},
    on: function (type: string, listener: (arg: string) => void) {
        if (this.listener[type]) {
            this.listener[type].push(listener)
        } else {
            this.listener[type] = [listener]
        }

    },
    emit: function (type: string, m: string) {
        if (this.listener[type]) {
            this.listener[type].forEach((lis) => {
                lis(m)
            })
        } else {
            console.log('un')
        }


    },

    unRegister: function () {
        this.listener = {}

    }
}


export default toastEventRes