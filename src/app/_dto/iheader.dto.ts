import { IadetailDto } from "./iadetail.dto";
import { IidetailDto } from "./iidetail.dto";
import { IiposupexpDto } from "./iiposupexp.dto";

/*
    Created By  : Arun Joy
    Created On  : 08-01-2020
    Created For : For creating dto for iheader
*/

export class IheaderDto {

    coCode:string="";
        
    dvCode:string="";
        
    brCode:string="";
        
    intCode:string="";
        
    vrNo:number=0;
        
    vrDate:Date | null=new Date();

    acCode:string | null="";

    acAmt:number | null=0;

    fAcAmt:number | null=0;

    curCode:string | null="";

    curRate:number | null=0;

    discPer:number | null=0;

    discAmt:number | null=0;

    acName:string | null="";

    billNo:string | null="";

    billDate:Date | null=null;

    refNo:string | null="";

    refDate:Date | null=null;

    bankCode:string | null="";

    crPeriod:number | null=0;

    salesman:string | null="";
        
    jobCode:string | null="";

    lpoNo:string | null="";
        
    lpoDate:Date | null=null;

    printCount:number | null=0;

    creditCard:string | null="";

    cardNo:string | null="";

    cardPerc:number | null=0;
        
    transferBr:string | null="";

    refCo:string | null="";

    refDv:string | null="";

    refBr:string | null="";

    refInt:string | null="";

    refVrNo:number | null=0;

    narration:string | null="";

    addExpAuto:string | null="";

    verified:string | null="Y";

    verifieddate:Date | null=new Date();

    verifieduser:string | null="";

    void:string="N";

    voiddate:Date | null=new Date();

    voiduser:string | null="";

    sysuser?:string | null;
        
    sysdate?:Date | null;

    modiuser?:string | null;

    modidate?:Date | null;

    narrationAr:string | null;
 
    vat:string | null="";

    vatPer:number | null=0;
 
    vatAmt:number | null=0;

    iadetail?: IadetailDto[]=[];

    iidetail?: IidetailDto[]=[];

    iiposupexp?: IiposupexpDto[]=[];
 
    summeryDetail?: string="";

    salesmanName?:string="";

    transferBrShtName? : string="";

    transferBrName? : string="";
}
