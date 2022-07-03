import React from "react";
import NewSample from "../features/Receive/NewSample";
import VerifyWorkSheetMain from "../component/VerifyWorkSheetMain";
import NotFound from "../component/NotFound";
import Login from "../features/Identity/Login";
import SignUp from "../features/Identity/SignUp";

import VerifyWorkSheetReceive from "../features/Receive/VerifyWorkSheetReceive";
import Main from "../component/Main";
import {
    AuthRequirement,
    DepartmentRequirement,
    NotLoginRequirement,
    TitleRequirement,
} from "./AuthRequiremnet";
import { Department, Title } from "./Role";
import ExportReport from "../features/Report/ExportReport";
import LabResult from "../features/Lab/LabResult";
import ResultInput from "../features/Lab/ResutlInput";
import VerifyResultLab from "../features/Lab/VerifyResultLab";
import VerifyResultManager from "../features/Mannager/VerifyResultManager";
import VerifyResultMain from "../component/VerifyResultMain";
import CreateSample from "../features/Receive/CreateSample";
import Print from "../features/Receive/Print";

import SendEmail from "../component/SendEmail";
import SendEmailReport from "../features/Report/SendEmailReport";
import ReviewWorkSheet from "../component/ReviewWorkSheet";
import WorkSheetForResult from "../component/WorkSheetForResult";
import ManageMethod from "../features/Lab/ManageMethod";
import CreateMethod from "../features/Lab/NewMethod";

interface UrlMatchComponent {
    requirement: AuthRequirement[];
    component: React.ComponentType<any>;
}
export interface MainRouteConfig {
    path: string;
    exact: true;
    prop?: any;
    componentList: UrlMatchComponent[];
    fallBackComponent: React.ComponentType<any>;
}

const mainConfig: MainRouteConfig[] = [
    {
        path: "/",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab,
                        Department.Receive,
                        Department.Report,
                        Department.Manager
                    ),
                ],
                component: Main,
            },
        ],
        fallBackComponent: Login,
    },
    {
        path: "/register",
        exact: true,
        componentList: [
            {
                requirement: [new NotLoginRequirement()],
                component: SignUp,
            },
        ],
        fallBackComponent: NotFound,
    },

    {
        path: "/login",
        exact: true,
        componentList: [
            {
                requirement: [new NotLoginRequirement()],
                component: Login,
            },
        ],
        fallBackComponent: NotFound,
    },

    {
        path: "/new",
        exact: true,
        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.Receive)],
                component: NewSample,
            },
            {
                requirement: [new DepartmentRequirement(Department.Report)],
                component: VerifyWorkSheetMain,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/new/:id",
        exact: true,
        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.Report)],
                component: ExportReport,
            },
            {
                requirement: [new DepartmentRequirement(Department.Receive)],
                component: CreateSample,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/verify",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.OgLab,
                        Department.MiLab,
                        Department.IgLab,
                        Department.Receive,
                        Department.Manager,
                        Department.Report
                    ),
                    new TitleRequirement(Title.Header),
                ],
                component: VerifyWorkSheetMain,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/result",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: LabResult,
            },
        ],
        fallBackComponent: NotFound,
    },

    {
        path: "/verify/:id",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.Receive,
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: VerifyWorkSheetReceive,
            },
            {
                requirement: [new DepartmentRequirement(Department.Report)],
                component: ExportReport,
            },
            {
                requirement: [new DepartmentRequirement(Department.Manager)],
                component: VerifyResultManager,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/workSheetForResult",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: WorkSheetForResult,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/workSheetForResult/:id",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: ResultInput,
            },
        ],
        fallBackComponent: NotFound,
    },

    {
        path: "/result/:id",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: ResultInput,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/verifyresult",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab,
                        Department.Manager
                    ),
                ],
                component: VerifyResultMain,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/verifyresult/:id",
        exact: true,
        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: VerifyResultLab,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/sendemail",
        exact: true,
        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.Report)],
                component: SendEmail,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/sendemail/:id",
        exact: true,
        componentList: [
            {
                requirement: [new DepartmentRequirement(Department.Report)],
                component: SendEmailReport,
            },
        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/manage-method",
        exact: true,

        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: ManageMethod,
            }

        ],
        fallBackComponent: NotFound,
    },
    {
        path: "/manage-method/new-method",
        exact: true,

        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: CreateMethod,
            }

        ],
        fallBackComponent: NotFound,
    },

    {
        path: "/:id",
        exact: true,

        componentList: [
            {
                requirement: [
                    new DepartmentRequirement(
                        Department.MiLab,
                        Department.IgLab,
                        Department.OgLab
                    ),
                ],
                component: ReviewWorkSheet,
            },
            {
                requirement: [new DepartmentRequirement(Department.Receive)],
                component: Print,
            },
        ],
        fallBackComponent: NotFound,
    },


];

export default mainConfig;
