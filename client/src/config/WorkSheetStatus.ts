import { Department } from "./Role";

interface IWorkSheetStatusLimitAccess {
    [department: string]: number[];
}

export const WorkSheetStatusLimitAccess: IWorkSheetStatusLimitAccess = {
    [Department.Receive]: [0, 1],
    [Department.MiLab]: [2, 3],
    [Department.CustomerService]: [1, 2],
    [Department.Manager]: [3, 4],
    [Department.Report]: [4, 5],
};
