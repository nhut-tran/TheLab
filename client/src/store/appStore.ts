import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import { CustomerStore } from "./CustomerStore";
import { DepartmentStore } from "./DepartmentStore";
import { MethodStore } from "./MethodStore";
import { SampleStore } from "./SampleStore";
import UserStore from "./userStore";

interface AppStore {
    methodStore: MethodStore;
    sampleStore: SampleStore;
    userStore: UserStore;
    commonStore: CommonStore;
    customerStore: CustomerStore;
    departmentStore: DepartmentStore;
}

export const appStore: AppStore = {
    methodStore: new MethodStore(),
    sampleStore: new SampleStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    customerStore: new CustomerStore(),
    departmentStore: new DepartmentStore(),
};

export const StoreContext = createContext(appStore);

export const useStore = () => {
    return useContext(StoreContext);
};
