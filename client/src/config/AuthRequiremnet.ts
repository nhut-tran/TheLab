import { UserClient } from "../api/entity";

export interface AuthRequirement {
    [re: string]: any;
    validate: (data: any) => boolean;
}

export class LoginRequirement implements AuthRequirement {
    validate = (user: UserClient) => {
        return true;
    };
}

export class DepartmentRequirement implements AuthRequirement {
    department: string[];
    constructor(...department: string[]) {
        this.department = department;
    }
    validate = (user: UserClient) => {
        if (user) return this.department.includes(user.department);
        return false;
    };
}

export class TitleRequirement implements AuthRequirement {
    title: string;
    constructor(title: string) {
        this.title = title;
    }
    validate = (user: UserClient) => {
        return this.title === user.title;
    };
}

export class NotLoginRequirement implements AuthRequirement {
    validate = (user: UserClient) => {
        console.log(user);
        return true;
    };
}
