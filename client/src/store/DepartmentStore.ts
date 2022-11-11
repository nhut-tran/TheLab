import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent';
import { Department } from '../api/entity';


export class DepartmentStore {

    departmentRegistry = new Map<string, Department>();

    constructor() {
        makeAutoObservable(this)
    }

    get departmentList() {
        return Array.from(this.departmentRegistry.values())
    }

    getDepartment = async () => {
        const data = await agent.department.get();
        data.value.forEach(dep => {
            runInAction(() => {
                this.departmentRegistry.set(dep.departmentID, dep);
            })
        });

    }
    getLab = () => {
        return this.departmentList.filter(d => (d.name.includes("Lab") && !d.name.includes("Manager")))
    }
}