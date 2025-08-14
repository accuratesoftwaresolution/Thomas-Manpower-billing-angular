export class IapodetailDto {

    coCode: string = "";

    dvCode: string = "";

    brCode: string = "";

    intCode: string = "";

    vrNo: number = 0;

    srNo: number = 0;

    vrDate: Date = new Date();

    acCode: string | null = "";

    acName: string | null = "";

    narration: string | null = "";

    uom: string | null = "";

    qty: number = 0;

    rate: number = 0;

    jobCode: string | null = "";

    jobHead: string | null = "";

    curCode: string = "";

    curRate: number = 0;

    discPer: number = 0;

    discAmt: number = 0;

    edd: Date = new Date();

    grvQty: number = 0;

    grvAmt: number = 0;

    osType: string = "";

    sortOrder: number = 0;

    refCo: string | null = "";

    refDv: string | null = "";

    refBr: string | null = "";

    refInt: string | null = "";

    refVrNo: number | null = 0;

    refSrNo: number | null = 0;

    void: string = "N";

    lumpSum: string = "N";

    signInt: number = 0;

    cnclQty: number = 0;

    vatInout: string | null;

    vatCat: number | null;

    vatType: string | null;

    vatPer: number = 0;

    crud?: string | null = "";

    vatAmt: number = 0;

    vat: string | null;

    vatAc: string | null;

    vatRcmCr: string | null;

}
