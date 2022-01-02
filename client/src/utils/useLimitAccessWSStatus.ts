import { WorkSheet } from "../api/entity";
import {
    WorkSheetStatusLimitAccess,
    WorkSheetStatusLimitAccess2,
} from "../config/WorkSheetStatus";
import { useStore } from "../store/appStore";

export const useLimitAccessWSStatus = (
    startOrEnd: "startLimit" | "endLimit",
    ws?: WorkSheet
) => {
    const { userStore, sampleStore } = useStore();
    if (!ws) ws = sampleStore.workSheet;
    let isStatusLower = false,
        isStatusEqual = false,
        isStatusLowerOrEqual = false;
    let handleVerify: (data: any) => void = sampleStore.verifyWorkSheet;
    if (userStore.user) {
        isStatusLower =
            ws.status <
            WorkSheetStatusLimitAccess[startOrEnd][userStore.user.department];
        isStatusEqual =
            ws.status ===
            WorkSheetStatusLimitAccess[startOrEnd][userStore.user.department];
        isStatusLowerOrEqual =
            ws.status <=
            WorkSheetStatusLimitAccess[startOrEnd][userStore.user.department];
        handleVerify = isStatusEqual
            ? sampleStore.unVerifyWorkSheet
            : handleVerify;
    }

    return { isStatusLower, isStatusLowerOrEqual, isStatusEqual, handleVerify };
};

export const useAccessWorkSheetByStatusVerify = (
    startOrEnd: "startLimit" | "endLimit"
) => {
    //get worksheet status
    //get worksheet requirement
    //compare => allow modified or viewonly
    const { userStore, sampleStore } = useStore();
    const ws = sampleStore.workSheet;
    let allowed = true;
    if (userStore.user) {
        var allowedStatus =
            WorkSheetStatusLimitAccess2[userStore.user.department];
        allowed =
            ws.status ===
            (startOrEnd === "startLimit" ? allowedStatus[0] : allowedStatus[1]);
    }
    return allowed;
};
