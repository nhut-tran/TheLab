import * as React from 'react'
import { Redirect, Route, useLocation, useRouteMatch } from 'react-router-dom'
import { history } from '..'
import { UserClient } from '../api/entity'
import NotFound from '../component/NotFound'
import { DepartmentRequirement, TitleRequirement } from '../config/AuthRequiremnet'
import mainConfig from '../config/MainConfig'
import mapUserIdentityUrl from '../utils/MapUserIndentityUrl'

type scheme = DepartmentRequirement | TitleRequirement
interface PrivateRouteProp {
    isLogin: boolean
    path: string,

    user?: UserClient,
    AuthRequire?: [scheme]
}

const PrivateRoute = ({ isLogin, path, AuthRequire, user, ...rest }: PrivateRouteProp) => {

    // const p = useLocation()
    // return <Route exact path={path}  {...rest} component={() => {
    //     // let Com = mapUserIdentityUrl(mainConfig, p.pathname, user)
    //     // return <Com />

    // }} />


}



export default PrivateRoute