import * as React from 'react'
import { ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'

interface PrivateRouteProp {
    isLogin: boolean
    path: string,
    Child: React.ComponentType<any>
}

const PublicRoute = ({ isLogin, path, Child, ...rest }: PrivateRouteProp) => {

    return <Route exact path={path}  {...rest} component={() => {
        console.log(isLogin)
        if (!isLogin) return <Child />
        return <Redirect to='/verify' />
    }} />
}

export default PublicRoute