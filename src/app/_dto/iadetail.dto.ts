import { IbillDto } from "./ibill.dto";

/*
    Created By  : Arun Joy
    Created On  : 07-01-2020
    Created For : For creating dto for iadetail
*/

export class IadetailDto {
   
    coCode:string | null="";

    dvCode:string="";
        
    brCode:string="";
        
    intCode:string="";

    vrNo:number=0;

    srNo:number=0;

    vrDate:Date=new Date();

    acCode:string | null="";

    acName?: string | null="";

    acAmt:number=0;

    fAcAmt:number=0;

    signInt:number=1;

    curCode:string | null="";

    curRate:number=0.00;

    interBrCode:string="";
        
    hAcCode:string | null="";

    pdc:string="N";
        
    chqNo:string | null="";

    chqDate:Date | null=null;

    chqBank:string | null=null;

    bankCode:string | null=null;

    clearedDate:Date | null=null;

    bReco:string | null="";

    bRecoDate:Date | null=null;

    vatAmt: number;

    void:string="N";

    narration:string | null="";

    refCo:string | null=null;
 
    refDv:string | null=null;

    refBr:string | null=null;

    refInt:string | null=null;

    refVrNo:number | null=0;

    refSrNo:number | null=0;
        
    narrationAr:string | null=null;

    sysuser: string;

    sysdate: Date;

    modiuser: string | null;

    modidate:Date | null;

    ibill?: IbillDto[];

    crud?: string | null;

    billAccount?: string | null;

    bill?: string
        
}
