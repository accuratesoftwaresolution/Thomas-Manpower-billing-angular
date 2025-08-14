import { IapodetailDto } from "./iapodetail.dto";

export class IapoheaderDto {

    coCode:string="";

    dvCode:string="";

    brCode:string="";

    intCode:string="";

    vrNo:number=0;
    
    vrDate:Date=new Date();

    refNo:string | null="";
 
    refDate:Date | null;

    acCode:string | null="";

    acName:string | null="";

    contact:string | null="";

    tel:string | null="";

    fax:string | null="";

    gsm:string | null="";

    email:string | null="";

    add1:string | null="";

    add2:string | null="";

    add3:string | null="";

    add4:string | null="";

    creditPeriod:number =0;

    paymentTerms:string | null="";

    shippingTerms:string | null="";

    edd:Date =new Date();

    jobCode:string | null="";

    discPer:number | null=0;
 
    discAmt:number | null=0;
 
    remarks:string | null="";

    modeOfShip:string | null="";

    deliveryTerms:string | null="";

    curCode:string="";

    curRate:number=0;

    status:string="";

    sysuser:string="";

    sysdate:Date=new Date();

    modiuser:string | null="";

    modidate:Date =new Date();

    verified:string | null="Y";

    verifieddate:Date | null=new Date();

    verifieduser:string | null="";

    void:string="N";

    voiddate:Date =new Date();

    voiduser:string | null="";

    sign1Name:string | null="";

    sign2Name:string | null="";

    sign3Name:string | null="";

    revisionNo:number | null=0;

    vat: string | null;

    vatAmt: number | null;

    iapodetail?:IapodetailDto[]=[];
}
