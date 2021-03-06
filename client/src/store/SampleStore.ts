import { makeAutoObservable, runInAction } from "mobx";
import { history } from "..";
import agent from "../api/agent";
import { Sample, WorkSheet } from "../api/entity";
import toastEventRes from "../utils/toaster/Toaster";
import { appStore } from "./appStore";

export class SampleStore {
    SampleRegistry = new Map<string, Sample>();
    selectedSample: Sample | undefined = undefined;
    workSheet: WorkSheet = {} as WorkSheet;
    constructor() {
        makeAutoObservable(this);
    }

    get SampleList() {
        return Array.from(this.SampleRegistry.values());
    }
    setWorkSheetValue = (val: WorkSheet) => {
        runInAction(() => {
            this.workSheet = val;
        })
    }

    getSample = async () => {
        const data = await agent.sample.get();
        data.value.forEach((Sample) => {
            runInAction(() => {
                this.SampleRegistry.set(Sample.sampleID.toString(), Sample);
            });
        });
    };

    getBlankWorkSheet = async (sampleNum: number) => {
        const data = await agent.worksheet.get(sampleNum);

        runInAction(() => {
            this.workSheet = data.value;
            history.push(`/new/${this.workSheet.workSheetNo}`);
        });
    };
    resetWorkSheet = () => {
        this.workSheet = {} as WorkSheet;
    };
    getWorkSheet = async (workSheetNo: string) => {
        const data = await agent.worksheet.getByNO(workSheetNo);
        this.workSheet = data.value;
    };

    SampleDetail = (id: string) => {
        this.selectedSample = this.SampleRegistry.get(id);
    };

    CreateSample = async (data: WorkSheet) => {
        await agent.worksheet.post(data);
        toastEventRes.emit("success", "Create succuess");
        this.workSheet = data;
        history.push(`/${data.workSheetNo}`);
    };

    UpdateSample = async (data: WorkSheet) => {
        await agent.worksheet.put(data);
        history.push("/");
        this.workSheet = data;
    };
    ResultInput = async (data: WorkSheet) => {
        await agent.worksheet.resultInput(data);
        history.push("/");
        this.workSheet = data;
    };

    verifyWorkSheet = async (data: string[]) => {
        var res = await agent.worksheet.verify(data);
        if (res.isSuccess) {
            data.forEach((wsn) => {
                appStore.commonStore.searchData =
                    appStore.commonStore.searchData.filter(
                        (ws) => ws.workSheetNo !== wsn
                    );
            });
            toastEventRes.emit("success", "Verify succuess");
            history.push("/verify");
        }
    };

    verifyWorkSheetResult = async (data: string[]) => {
        var res = await agent.worksheet.verifyResult(data);
        if (res.isSuccess) {
            data.forEach((wsn) => {
                appStore.commonStore.searchData =
                    appStore.commonStore.searchData.filter(
                        (ws) => ws.workSheetNo !== wsn
                    );
            });
            toastEventRes.emit("success", "Verify succuess");
            history.push("/verifyresult");
        }
    };
    unVerifyWorkSheet = async (wsn: string) => {
        await agent.worksheet.unverify(wsn);
        history.push("/verify");
    };

    generateReport = async (wsn: string) => {
        await agent.worksheet.generateReport(wsn);
        history.push("/verify");
    };

    generayeWSPDF = async (wsn: string) => {
        await agent.worksheet.generateWSPDF(wsn);
    };

    deleteWorkSheet = async (id: string) => {
        const res = await agent.worksheet.del(id)
        if (res.isSuccess) {
            toastEventRes.emit("success", "Delete succuess");
            history.push("/")
            this.workSheet = {} as WorkSheet;

        }

    }


}
