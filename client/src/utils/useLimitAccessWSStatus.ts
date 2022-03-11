import { boolean } from "yup/lib/locale";
import { WorkSheet } from "../api/entity";
import { WorkSheetStatusLimitAccess } from "../config/WorkSheetStatus";
import { useStore } from "../store/appStore";

export const useAccessWorkSheetByStatusVerify = () => {
    //get worksheet status
    //get worksheet requirement
    //compare => allow modified or viewonly
    const { userStore, sampleStore } = useStore();
    const ws = sampleStore.workSheet;

    let allowed = {
        startlimit: false,
        process: false,
        endlimit: false,
    };
    if (userStore.user) {
        var departmentStatus =
            WorkSheetStatusLimitAccess[userStore.user.department];
        allowed = {
            startlimit: departmentStatus["startlimit"] === ws.status,
            process: departmentStatus["process"] === ws.status,
            endlimit: departmentStatus["endlimit"] === ws.status,
        };
    }
    return allowed;
};
