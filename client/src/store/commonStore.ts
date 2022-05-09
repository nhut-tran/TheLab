import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../api/agent";
import { WorkSheet } from "../api/entity";
import { appStore } from "./appStore";

class CommonStore {
    appReady: boolean = false;
    searchKey = "";
    searchData: WorkSheet[] = [];
    isFetching = false;
    metadata: any;
    error: string[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    setAppReady = () => {
        this.appReady = true;
    };
    setFetching = () => {
        this.isFetching = !this.isFetching;
    };
    setSearch = (search: string) => {
        this.searchKey = search;
    };
    setSearchData = (data: WorkSheet[]) => {
        runInAction(() => {
            this.searchData = data;
        });
    };
    setError = (err: string) => {
        runInAction(() => {
            this.error.push(err);
            setTimeout(() => {
                this.error = [];
            }, 1000);
        });
    };
    search = async (data: {
        Worksheet: string;
        WorkSheet_BySample: string;
    }) => {
        const ser = Object.entries(data)
            .filter((e) => !e.includes(""))
            .flat();

        const res = await agent.common.search(
            ser[0].split("_").join("/"),
            ser[1]
        );
        this.setSearchData([res.data.value]);

        appStore.sampleStore.setWorkSheetValue(res.data.value);
    };

    getUnApproveWorkSheet = async (withResult: boolean, page = "1") => {
        if (withResult) {
            const res = await agent.common.getUnVerifyWorkSheetWithResult();
            this.setSearchData(res.data.value);
            return;
        }
        const res = await agent.common.getUnapprovedWorksheet(page);
        this.metadata = res.data.metadata;
        this.setSearchData(res.data.value);
    };
    getApprovedWorkSheet = async (page = "1") => {
        const res = await agent.common.getApprovedWorksheet(page);
        this.metadata = res.data.metadata;
        this.setSearchData(res.data.value);
    };
    getWorkSheetForResult = async (page = "1") => {
        const res = await agent.common.getWorkSheetForResult(page);
        this.metadata = res.data.metadata;
        this.setSearchData(res.data.value);
    };

    getSearchValue = (WSN: string) => {
        const val = this.searchData.find((w) => w.workSheetNo === WSN);
        console.log(toJS(val))
        if (val) appStore.sampleStore.workSheet = val;
    };

    resetSearchValue = () => {
        runInAction(() => {
            this.searchData = [];
        });
    };
}

export default CommonStore;
