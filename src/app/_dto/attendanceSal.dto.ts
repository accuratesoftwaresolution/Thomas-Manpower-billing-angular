import { apsaldetailDto } from "./saldetail.dto";

export class attendanceSalaryDto{
    
    coCode: string;

    dvCode:string;

    brCode:string;

    intCode: string;

    vrNo: number;

    vrDate: Date;

    narration: string;

    refCo: string;

    refDv: string;

    refBr: string;

    refInt: string;

    refVrNo: number;

    verified: string;

    verifiedDate: Date;

    verifiedUser: string;

    cancel: string;

    voidDate: Date;

    voidUser: string;

    sysuser: string;

    systemdate: Date;

    modiuser: string;

    modidate: Date;

    jvDate: Date;

    apsaldetail?:apsaldetailDto[];

    salCat?:string;

    attYear?: number;
        
    attMnth?: number;

    selectedDate?:Date;

}