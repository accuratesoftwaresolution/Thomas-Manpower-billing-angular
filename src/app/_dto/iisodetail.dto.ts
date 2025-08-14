export class IisodetailDto {
    coCode: string;

    dvCode: string;

    brCode: string;

    intCode: string;

    vrNo: number;

    srNo: number;

    vrDate: Date;

    itemCode: string | null;

    itemName: string | null;

    specification: string | null;

    itemQty: number = 0;

    uom: string | null;

    cFactor: number = 1;

    itemRate: number = 0;

    curCode: string | null;

    curRate: number = 1;

    disPer: number = 0;

    disAmt: number = 0;

    edd: Date | null;

    dnQty: number | null;

    sortOrder: number;

    void: string;

    refCo: string | null;

    refDv: string | null;

    refBr: string | null;

    refInt: string | null;

    refVrNo: number | null;

    refSrNo: number | null;

    sysuser1: string | null;

    sysdate1: Date | null;

    modiuser: string | null;

    modidate: Date | null;

    baseRate: number | null = 0;

    costRate: number;

    stockCode: string | null;

    cnclQty: number | null;

    jobCode: string | null;

    vatPer: number;

    vatAmt: number;

    vatType: string | null;

    vat: string | null;
}