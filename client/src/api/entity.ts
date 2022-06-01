

export interface Method {

    methodID: string;
    name: string;
    unit: string;
    description: string;
    turnArroundDay: number;
    departmentID: string;
}

export interface Sample {
    sampleID: number;
    sampleNo: number;
    workSheetID: string;
    description: string;
    weight: number;
    note: string | null;
    status: number;
    resultDate?: string;
    sealNumber: string;
    sampling: boolean;
    urgent: boolean;
    paramaters: MethodSampleAss[]

}

export interface MethodSampleAss {


    methodID: string,
    method: string,
    result: string,
    status?: number,
    unit: string,
    resultDate: string

}

export interface SampleInput {
    description: string;
    weight: number;
    note: string | null;
    sealNumber: string;
    sampling: boolean;
    paramaters: MethodSampleAss[]
}
export interface WorkSheetInput {

    note?: string
    issueTo: string,
    receiveDate: string,
    resultDate?: Date;
    samples: SampleInput[]

}

export interface WorkSheet {
    workSheetID: string,
    workSheetNo: string,
    note?: string
    issueTo: string,
    status: number,
    receiveDate: string,
    resultDate?: string,
    samples: Sample[]
}

export interface Department {
    departmentID: string,
    name: string
}
export interface UserRegister {
    userName: string,
    title: string,
    email: string,
    password: string
}

export interface UserClient {
    userName: string,
    email: string,
    department: string,
    title: string
    token: tokenResponse
}

export interface Customer {
    customerId: string;
    name: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
}


export interface NewSample {
    issueTo: Customer,
    workSheetNumber?: string,
    workSheet: {
        receiveDate: string,
        samples: [
            {
                description: string,
                weight: number,
                note: string,
                sealNumber: string,
                sampling: boolean,
                paramaters: [
                    {
                        methodID: string,
                        method: string,

                    }
                ]
            }
        ]
    }

}


export interface tokenResponse {
    refreshToken: string,
    jwt: string
}