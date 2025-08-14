/*
    Created By  : Arun Joy
    Created On  : 08-01-2020
    Created For : For creating dto for iidetail
*/

export class IidetailDto {

    coCode:string | null="";

    dvCode:string="";

    brCode:string="";

    intCode:string="";
        
    vrNo:number=0;
 
    srNo:number=0;

    vrDate:Date | null=new Date();

    itemCode:string | null="";

    itemQty:number=0;

    cFactor:number=1;
        
    baseRate:number | null=0.0;

    itemRate:number=0.0;

    costRate:number=0.0;
        
    addAmt:number=0;

    curCode:string | null="";
        
    curRate:number=1;
        
    disPer:number=0.0;
        
    disAmt:number=0.0;
        
    signInt:number | null=1;
        
    uom:string | null="";
        
    interBrCode:string | null="";

    storeCode:string | null="";
        
    refCo:string | null="";
        
    refDv:string | null="";
        
    refBr:string | null="";
        
    refInt:string | null="";

    refVrNo:number | null=0;
        
    refSrNo:number | null=0;
        
    retQty:number=0;

    itemDesc:string | null="";
        
    sortOrder:number | null=0;

    void:string | null="";
        
    sysuser1:string | null="";

    sysdate1:Date | null=new Date();
        
    modiuser:string | null="";

    modidate:Date | null=new Date();
        
    jobCode:string | null="";
        
    jobHead:string | null="";

    groupCode:string | null="";
        
    subGroupCode:string | null="";

    expHead:string | null="";
        
    remark:string | null="";
        
    vatPer:number=0;
 
    vatAmt:number=0;

    vatType:string | null="";
        
    vat:string | null="N";

    crud?: string | null;
        
}
