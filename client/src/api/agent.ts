import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { appStore } from "../store/appStore";
import toastEventRes from "../utils/toaster/Toaster";
import {
    Customer,
    Method,
    Sample,
    UserClient,
    UserRegister,
    WorkSheet,
    tokenResponse,
    Department,
} from "./entity";

export interface ResponseData<T> {
    isSuccess: boolean;
    error: string | null;
    metadata: {
        TotalItem: number;
        ItemPerpage: number;
        PageCount: number;
        CurrentPage: number;
    };
    entity: string;
    value: T[];
}
export interface ResponseDataSingle<T> {
    isSuccess: boolean;
    error: string | null;
    entity: string;
    value: T;
}

export interface ResponseDataVoid {
    isSuccess: boolean;
    error: string | null;
    entity: string;
    value: {};
}

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const request = {
    get: <ResponseData>(entity: string) =>
        axios
            .get<ResponseData>(`/${entity}`)
            .then<ResponseData>((res) => res.data),
    post: <ResponseData>(entity: string, data: {}) => {
        return axios
            .post<ResponseData>(`/${entity}`, data)
            .then<ResponseData>((res) => res.data);
    },
    put: <ResponseData>(entity: string, data: {}) =>
        axios
            .put<ResponseData>(`/${entity}`, data)
            .then<ResponseData>((res) => res.data),
    del: <ResponseData>(entity: string, id: string) =>
        axios
            .delete<ResponseData>(`/${entity}`)
            .then<ResponseData>((res) => res.data),
    download: <Blob>(entity: string, config: AxiosRequestConfig) =>
        axios.get<Blob>(`/${entity}`, config),
};

const RaiseError = (err: AxiosError, defaultMessage?: string) => {
    let message: string = "";
    if (err.response?.data.error && err.response.data.error.message)
        message = err.response.data.error.message;

    toastEventRes.emit(
        "fail",
        message ? err.response?.data.error.message : defaultMessage
    );
};
axios.interceptors.request.use(function (config) {
    appStore.commonStore.setFetching();
    config.headers["Authorization"] = `Bearer ${appStore.userStore.token}`;

    return config;
});

axios.interceptors.response.use(
    function (res) {
        appStore.commonStore.setFetching();
        return res;
    },
    function (err: AxiosError) {
        appStore.commonStore.setFetching();

        if (
            err.response?.status === 401 &&
            err.config.url === "/Account/refresh"
        ) {
            return Promise.reject(err).finally(() => { });
        } else if (
            err.response?.status === 401 &&
            err.config.url === "/Account/login"
        ) {
            RaiseError(err, "Username or password is wrong");

            appStore.userStore.refreshUser();
        } else if (err.response?.status === 401) {
            RaiseError(err, "Please Login");

            appStore.userStore.refreshUser();
        } else if (err.response?.status === 403) {
            RaiseError(err, "Access denied");

            appStore.userStore.refreshUser();
        } else if (err.response?.status === 404) {
            RaiseError(err, "Not Found");
        } else {
            RaiseError(err, "Something went wrong");
        }

        return Promise.reject(err);
    }
);

export const userAgent = {
    login: (user: { email: string; password: string }) => {
        return axios
            .post<UserClient>("/Account/login", user)
            .then<UserClient>((res) => {
                return res.data;
            });
    },

    signUp: (user: UserRegister) => {
        return axios
            .post<UserClient>("/Account/register", user)
            .then<UserClient>((res) => {
                return res.data;
            });
    },

    currentUser: () => {
        return axios
            .get<UserClient>("/Account/myaccount")
            .then<UserClient>((res) => res.data);
    },

    refresh: (token: tokenResponse) => {
        return axios
            .post<UserClient>("/Account/refresh", token)
            .then<UserClient>((res) => res.data);
    },

    logout: () => {
        return axios
            .get<ResponseData<Blob>>("/Account/logout")
            .then((res) => res.data);
    },
};

const agent = {
    method: {
        get() {
            return request.get<ResponseData<Method>>("Method");
        },

        post(data = {}) {
            return request.post<ResponseData<Method>>("Method", data);
        },

        put(data = {}) {
            return request.put<ResponseData<Method>>("Method", data);
        },

        del(id: string) {
            return request.del<ResponseData<Method>>("Method", id);
        },
    },

    sample: {
        get() {
            return request.get<ResponseData<Sample>>("Sample");
        },

        post(data = {}) {
            return request.post<ResponseData<{}>>("Jobsheet", data);
        },

        put(data = {}) {
            return request.put<ResponseData<Sample>>("Sample", data);
        },

        del(id: string) {
            return request.del<ResponseData<Method>>("Sample", id);
        },
    },

    worksheet: {
        get(sampleNum: number) {
            return request.get<ResponseDataSingle<WorkSheet>>(
                `WorkSheet/blank/${sampleNum}`
            );
        },

        getByNO(workSheetNo: string) {
            return request.get<ResponseDataSingle<WorkSheet>>(
                `WorkSheet/${workSheetNo}`
            );
        },

        post(data = {}) {
            return request.post<ResponseDataVoid>("WorkSheet", data);
        },

        put(data = {}) {
            return request.put<ResponseDataVoid>("WorkSheet", data);
        },

        del(id: string) {
            return request.del<ResponseData<WorkSheet>>(`WorkSheet/${id}`, id);
        },

        verify(data: string[]) {
            return request.post<ResponseDataVoid>("WorkSheet/verify", data);
        },
        resultInput(data = {}) {
            return request.put<ResponseDataVoid>("WorkSheet/Result", data);
        },
        verifyResult(data: string[]) {
            return request.post<ResponseDataVoid>(
                "WorkSheet/verifyresult",
                data
            );
        },
        unverify(wsn: string) {
            return request.get<ResponseDataVoid>(`WorkSheet/Unverify/${wsn}`);
        },
        generateReport(wsn: string) {
            return request
                .download<Blob>(`WorkSheet/generateReport/${wsn}`, {
                    responseType: "blob",
                })
                .then((res) => {
                    console.log(res);
                    const blob = new Blob([res.data], {
                        type: res.headers["content-type"],
                    });
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download =
                        res.headers["content-disposition"].split("=")[1];
                    link.click();
                });
        },
        generateWSPDF(wsn: string) {
            return request
                .download<Blob>(`WorkSheet/generateworksheet/${wsn}`, {
                    responseType: "blob",
                })
                .then((res) => {
                    const blob = new Blob([res.data], {
                        type: res.headers["content-type"],
                    });
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download =
                        res.headers["content-disposition"].split("=")[1];
                    link.click();
                });
        },
    },
    department: {
        get() {
            return request.get<ResponseData<Department>>("Department");
        },

        post(data = {}) {
            return request.post<ResponseData<Department>>("Department", data);
        },
    },
    customer: {
        get() {
            return request.get<ResponseData<Customer>>("Customer");
        },

        post(data = {}) {
            return request.post<ResponseData<Customer>>("Customer", data);
        },

        put(data = {}) {
            return request.put<ResponseData<Customer>>("Customer", data);
        },

        del(id: string) {
            return request.del<ResponseData<Customer>>("Customer", id);
        },
        sendEmail(wsn: string, emailType: "receipt" | "report") {
            return request.get<ResponseData<void>>(
                `WorkSheet/sendemail${emailType}/${wsn}`
            );
        },
    },

    common: {
        search(entity: string, key: string) {
            return axios.get<ResponseDataSingle<any>>(`${entity}/${key}`);
        },
        getUnapprovedWorksheet(page: string) {
            return axios.get<ResponseData<WorkSheet>>(
                `WorkSheet/Unapproved/${page}`
            );
        },
        getApprovedWorksheet(page: string) {
            return axios.get<ResponseData<WorkSheet>>(
                `WorkSheet/Approved/${page}`
            );
        },
        getWorkSheetForResult(page: string) {
            return axios.get<ResponseData<WorkSheet>>(
                `WorkSheet/WorkSheetForResult/${page}`
            );
        },
        getUnVerifyWorkSheetWithResult() {
            return axios.get<ResponseData<WorkSheet>>(
                "WorkSheet/UnapproveWithResult"
            );
        },
    },
};

export default agent;
