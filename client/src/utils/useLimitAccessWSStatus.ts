import { WorkSheet } from "../api/entity";
import { WorkSheetStatusLimitAccess } from "../config/WorkSheetStatus";
import { useStore } from "../store/appStore";

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
            WorkSheetStatusLimitAccess[userStore.user.department];
        allowed =
            ws.status ===
            (startOrEnd === "startLimit" ? allowedStatus[0] : allowedStatus[1]);
    }
    return allowed;
};
