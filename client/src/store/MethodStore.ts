import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Method } from '../api/entity';

export class MethodStore {

    methodRegistry = new Map<string, Method>();
    selectedMethod: Method | undefined = undefined
    constructor() {
        makeAutoObservable(this)
    }

    get methodList() {
        return Array.from(this.methodRegistry.values())
    }

    getMethod = async () => {
       const data = await agent.method.get();
        data.value.forEach(method => {
            runInAction(() => {
                this.methodRegistry.set(method.methodID, method);
            })
        });
        
    }

    methodDetail = (id: string) => {
        this.selectedMethod = this.methodRegistry.get(id);
    }
}




