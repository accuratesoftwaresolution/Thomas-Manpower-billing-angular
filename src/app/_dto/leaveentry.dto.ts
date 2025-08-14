export class leaveEntryDto{
 
        coCode: string;

        dvCode: string;
        
        brCode: string;
        
        intCode: string;
        
        vrNo: number;
        
        vrDate: Date;
        
        status: string;
        
        empCode: string;
        
        lvFrom: Date;
        
        lvTo: Date;
        
        lvDays: number;
        
        lvType: string;
        
        lvDesc: string;
        
        approvinguser: string;
        
        finalizinguser: string;
        
        appLvFrom: Date;
        
        appLvTo: Date;
        
        appLvDays: number;
        
        payType: string;
        
        paymentType: string;
        
        appuser: string;
        
        appdate: Date;
        
        finaluser: string;
        
        finaldate: Date;
        
        appRemark: string;
        
        finalRemark: string;
        
        expRejoinDate: Date | string;
        
        sysuser: string;
        
        systemdate: Date;
        
        modiuser: string;
        
        modidate: Date;
        
        lvApplicableFrm: Date;
        
        rejoinDt: Date;
        
        lvApplicableTo: Date;
        
        srNo: number;
        
        lvApplicableDays: number;
        
        signInt: number;
        
        cancel: string;
        
        actualLvTo: Date;
        
        rejoinRequired: string;
        
        voiddate: Date;
        
        voiduser: string;
        
        ticketGiven: string;

        eligAnnualLv?: number;

        joinDate?: Date;

        lastEntryFromLv?: Date;

        nextAnnualLv?: number;

        availed?: number;

        empName?: string;
}