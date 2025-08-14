/*
    Created By  : Arun Joy
    Created On  : 07-01-2020
    Created For : For creating dto for ibill
*/

export class IbillDto  {

    coCode:string;
        
    dvCode:string;
        
    brCode:string;
        
    intCode:string;

    vrNo:number;
        
    dsrNo:number;
        
    srNo:number;

    vrDate:Date;

    acCode:string;
 
    billNo:string;

    billDate:Date;

    dueDate:Date | null;

    acAmt:number;
        
    fAcAmt:number;

    curCode:string;

    curRate:number;

    signInt:number;
 
    hAcCode:string | null;

    interBrCode:string;

    lpoNo:string | null;
        
    void:string | null;

    refCo:string;

    refDv:string;

    refBr:string;

    refInt:string;
        
    refVrNo:number;
        
}
