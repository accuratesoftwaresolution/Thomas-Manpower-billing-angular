/*
    Created By  : Aswathy Prasad T P
    Created On  : 04-03-2020
    Created For : For creating dto for iipodetail
*/


export class IipodetailDto {

    coCode: string = "";

    dvCode: string = "";

    brCode: string = "";

    intCode: string = "";

    vrNo: number = 0;

    srNo: number = 0;

    vrDate: Date;

    itemCode: string | null = "";

    itemName: string | null = "";

    specification: string | null = "";

    itemQty: number = 0;

    uom: string | null = "";

    cFactor: number = 1;

    itemRate: number = 0;

    curCode: string | null = "OMR";

    curRate: number = 1;

    disPer: number = 0;

    disAmt: number = 0;

    edd: Date | null = new Date();

    grvQty: number = 0;

    sortOrder: number = 0;

    refCo: string | null = "";

    refDv: string | null = "";

    refBr: string | null = "";

    refInt: string | null = "";

    refVrNo: number | null = 0;

    refSrNo: number | null = 0;

    void: string = "";

    baseRate: number | null = 0;

    sysuser1: string | null = "";

    sysdate1: Date | null = new Date();

    modiuser: string | null = "";

    modidate: Date | null = new Date();

    cnclQty: number = 0;

    jobCode: string | null = "";

    lumpSum: string | null = "Q";

    grnAmt: number = 0;

    costRate: number = 0;

    addAmt: number = 0;

    vatPer: number = 0;

    vatAmt: number = 0;

    vatType: string | null = "";

    vat: string | null = "";

    unitName?: string;

    length?:any;
}
