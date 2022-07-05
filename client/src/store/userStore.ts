
import { makeAutoObservable } from 'mobx'
import { history } from '..'
import { userAgent } from '../api/agent'
import { tokenResponse, UserClient, UserRegister } from '../api/entity'
import { appStore } from './appStore'


class UserStore {

    token: string | null = localStorage.getItem('token')
    refreshToken = localStorage.getItem('rftoken')
    user: UserClient = {
        userName: "",
        email: "",
        department: "",
        title: "",
        token: {
            refreshToken: "",
            jwt: ""
        }
    }

    constructor() {
        makeAutoObservable(this)
    }

    isLogIn() {
        return !!(this.user.userName && this.user.email && this.user.token.jwt)
    }


    private setToken = (token: string, refreshToken: string) => {
        localStorage.setItem('token', token)
        localStorage.setItem('rftoken', refreshToken)
        this.refreshToken = refreshToken
        this.token = token
    }

    login(user: { email: string, password: string }) {

        userAgent.login(user).then(data => {
            this.setUser(data)
            this.setToken(data.token.jwt, data.token.refreshToken)

            history.push('/')
        })
    }
    signUp = (user: UserRegister) => {
        userAgent.signUp(user).then(data => {
            this.setUser(data)
            console.log(data)
            this.setToken(data.token.jwt, data.token.refreshToken)
            this.token = localStorage.getItem('token')
            history.push('/')
        }).catch((e) => {
            console.log(e.message)
        })
    }

    private setUser = (user: UserClient) => this.user = user

    checkCurrentUser = () => {


        userAgent.currentUser().then(data => {
            this.setUser(data)
            appStore.commonStore.setAppReady()
        }).catch(e => {
            appStore.commonStore.setAppReady()
        })

    }

    refreshUser = () => {
        // if (this.token !== null && this.refreshToken !== null) {

        return userAgent.refresh({ jwt: this.token, refreshToken: this.refreshToken } as tokenResponse).then(user => {
            this.setUser(user)
            this.setToken(user.token.jwt, user.token.refreshToken)
        }).catch(() => {
            history.push('/')
        })
        //  }
    }

    logout = () => {
        return userAgent.logout().finally(() => {

            this.user = {
                userName: "",
                email: "",
                department: "",
                title: "",
                token: {
                    refreshToken: "",
                    jwt: ""
                }
            }
            localStorage.removeItem('token')
            localStorage.removeItem('rftoken')


        })
    }


}

export default UserStore