import { WorkSheet } from "../api/entity";
import { WorkSheetStatusLimitAccess } from "../config/WorkSheetStatus";
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
