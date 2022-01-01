import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Customer } from "../api/entity";

export class CustomerStore {
    customerRegistry = new Map<string, Customer>();

    constructor() {
        makeAutoObservable(this);
    }

    get customerList() {
        return Array.from(this.customerRegistry.values());
    }

    getCustomer = async () => {
        const data = await agent.customer.get();
        data.value.forEach((cus) => {
            runInAction(() => {
                this.customerRegistry.set(cus.customerId, cus);
            });
        });
    };
    sendEmail = async (wsn: string) => {
        await agent.customer.sendEmail(wsn);
    };
}
