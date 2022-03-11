import { Department } from "./Role";

interface IWorkSheetStatusLimitAccess {
    [department: string]: {
        startlimit: number;
        process?: number;
        endlimit: number;
    };
}

export const WorkSheetStatusLimitAccess: IWorkSheetStatusLimitAccess = {
    [Department.Receive]: {
        startlimit: 0,
        endlimit: 1,
    },
    [Department.MiLab]: {
        startlimit: 1,
        process: 2,
        endlimit: 3,
    },
    [Department.IgLab]: {
        startlimit: 1,
        process: 2,
        endlimit: 3,
    },
    [Department.OgLab]: {
        startlimit: 1,
        process: 2,
        endlimit: 3,
    },
    [Department.Manager]: {
        startlimit: 3,
        endlimit: 4,
    },
    [Department.Report]: {
        startlimit: 4,
        endlimit: 5,
    },
};
