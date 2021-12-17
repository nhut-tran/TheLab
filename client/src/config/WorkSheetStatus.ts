import { Department } from "./Role";

interface IWorkSheetStatusLimitAccess {
    startLimit: {
        [department: string]: number
    },
    endLimit: {
        [department: string]: number
    }

}
export const WorkSheetStatusLimitAccess: IWorkSheetStatusLimitAccess = {
    startLimit: {

        [Department.MiLab]: 2,
        [Department.Report]: 4,
        [Department.Receive]: 0,
        [Department.Manager]: 4,

    },

    endLimit: {
        [Department.Receive]: 1,
        [Department.MiLab]: 3,
        [Department.Report]: 5,
        [Department.Manager]: 6,
    }


}

//0 => 1 => 2 => 3 => 4  => 5
//re   re   la   la   la    