import React from "react"
import NewSample from "../features/Receive/NewSample"
import VerifyWorkSheetMain from "../component/VerifyWorkSheetMain"
import NotFound from "../component/NotFound"
import Login from "../features/Identity/Login"
import SignUp from "../features/Identity/SignUp"

import VerifyWorkSheetLab from "../features/Lab/VerifyWorkSheetLab"
import VerifyWorkSheetReceive from "../features/Receive/VerifyWorkSheetReceive"
import Main from "../component/Main"
import { AuthRequirement, DepartmentRequirement, NotLoginRequirement, TitleRequirement } from "./AuthRequiremnet"
import { Department, Title } from "./Role"
import ReviewReport from "../features/Report/ReviewReport"
import LabResult from "../features/Lab/LabResult"
import ResultInput from "../features/Lab/ResutlInput"
import VerifyResultLab from "../features/Lab/VerifyResultLab"
import VerifyResultManager from "../features/Mannager/VerifyResultManager"
import ViewWorkSheet from "../component/ViewWorkSheet"
import VerifyResultMain from "../component/VerifyResultMain"
import CreateSample from "../features/Receive/CreateSample"

interface UrlMatchComponent {
    requirement: AuthRequirement[],
    component: React.ComponentType<any>

}
export interface MainRouteConfig {
    path: string,
    exact: true,
    prop?: any
    componentList: UrlMatchComponent[],
    fallBackComponent: React.ComponentType<any>
}




const mainConfig: MainRouteConfig[] = [

    {
        path: '/',
        exact: true,
        componentList: [
            { requirement: [new DepartmentRequirement(Department.Receive)], component: Main },
            { requirement: [new DepartmentRequirement(Department.MiLab)], component: Main },
            { requirement: [new DepartmentRequirement(Department.Report)], component: Main },
            { requirement: [new DepartmentRequirement(Department.Manager)], component: Main }
        ],
        fallBackComponent: Login

    },
    {
        path: '/register',
        exact: true,
        componentList: [
            {
                requirement: [new NotLoginRequirement()],
                component: SignUp
            }
        ],
        fallBackComponent: NotFound
    },



    {
        path: '/login',
        exact: true,
        componentList: [
            {
                requirement: [new NotLoginRequirement()],
                component: Login
            }
        ],
        fallBackComponent: NotFound
    },


    {
        path: '/new',
        exact: true,
        componentList: [
            { requirement: [new DepartmentRequirement(Department.Receive)], component: NewSample },
            { requirement: [new DepartmentRequirement(Department.Report)], component: VerifyWorkSheetMain },

        ],
        fallBackComponent: NotFound
    },
    {
        path: '/new/:id',
        exact: true,
        componentList: [

            { requirement: [new DepartmentRequirement(Department.Report)], component: ReviewReport },
            { requirement: [new DepartmentRequirement(Department.Receive)], component: CreateSample },
        ],
        fallBackComponent: NotFound
    },
    {
        path: '/verify',
        exact: true,
        componentList: [
            { requirement: [new DepartmentRequirement(Department.Receive)], component: VerifyWorkSheetMain },
            { requirement: [new DepartmentRequirement(Department.MiLab)], component: VerifyWorkSheetMain },
            { requirement: [new DepartmentRequirement(Department.Report), new TitleRequirement(Title.Header)], component: VerifyWorkSheetMain },
            { requirement: [new DepartmentRequirement(Department.Manager)], component: VerifyWorkSheetMain },
        ],
        fallBackComponent: NotFound
    },
    {
        path: '/result',
        exact: true,
        componentList: [

            { requirement: [new DepartmentRequirement(Department.MiLab)], component: LabResult }
        ],
        fallBackComponent: NotFound
    },

    {
        path: '/verify/:id',
        exact: true,
        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.MiLab)],
                component: VerifyWorkSheetLab
            },
            {
                requirement: [new DepartmentRequirement(Department.Receive)],
                component: VerifyWorkSheetReceive
            },
            {
                requirement: [new DepartmentRequirement(Department.Report)],
                component: ReviewReport
            },
            {
                requirement: [new DepartmentRequirement(Department.Manager)],
                component: VerifyResultManager
            }
        ],
        fallBackComponent: NotFound

    },

    {
        path: '/result/:id',
        exact: true,
        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.MiLab)],
                component: ResultInput
            }
        ],
        fallBackComponent: NotFound

    },
    {
        path: '/verifyresult',
        exact: true,
        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.MiLab)],
                component: VerifyResultMain

            },
            {
                requirement: [new DepartmentRequirement(Department.Manager)],
                component: VerifyResultMain

            }
        ],
        fallBackComponent: NotFound

    },
    {
        path: '/verifyresult/:id',
        exact: true,
        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.MiLab)],
                component: VerifyResultLab

            }
        ],
        fallBackComponent: NotFound

    },

    {
        path: '/:id',
        exact: true,

        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.MiLab)],
                component: ViewWorkSheet
            },
            {
                requirement: [new DepartmentRequirement(Department.Receive)],
                component: ViewWorkSheet

            }
        ],
        fallBackComponent: NotFound

    },









]




export default mainConfig