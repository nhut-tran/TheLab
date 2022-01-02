import { Department } from "./Role";

interface IWorkSheetStatusLimitAccess {
    startLimit: {
        [department: string]: number;
    };
    endLimit: {
        [department: string]: number;
    };
}
interface IWorkSheetStatusLimitAccess2 {
    [department: string]: number[];
}

export const WorkSheetStatusLimitAccess2: IWorkSheetStatusLimitAccess2 = {
    [Department.Receive]: [0, 1],
    [Department.MiLab]: [2, 3],
    [Department.CustomerService]: [1, 2],
    [Department.Manager]: [3, 4],
    [Department.Report]: [4, 5],
};

export const WorkSheetStatusLimitAccess: IWorkSheetStatusLimitAccess = {
    startLimit: {
        [Department.MiLab]: 3,
        [Department.Report]: 4,
        [Department.CustomerService]: 3,
        [Department.Receive]: 0,
        [Department.Manager]: 5,
    },

    endLimit: {
        [Department.Receive]: 1,
        [Department.CustomerService]: 3,
        [Department.MiLab]: 4,
        [Department.Report]: 7,
        [Department.Manager]: 7,
    },
};

//0 => 1 => 2 => 3 => 4  => 5
//re   re   la   la   la
