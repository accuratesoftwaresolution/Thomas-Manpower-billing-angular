export class IiposupexpDto {

    coCode: string;

    dvCode: string;

    brCode: string;

    intCode: string;

    vrNo: number;

    vrDate: Date | null;

    srNo: number;

    particulars: string | null;

    amt: number | null = 0;

    signInt: number | null;

    refCo: string | null;

    refDv: string | null;

    refBr: string | null;

    refInt: string | null;

    refVrNo: number | null;

    refSrNo: number | null;

    acCode: string | null;

    curCode: string | null;

    curRate: number | null;

    vatPer: number = 0;

    vatAmt: number = 0;

    vatType: string | null;

    vat: string | null;

    vatInout: string | null;

    vatCat: number | null;

    vatAc: string | null;

    vatRcmCr: string | null;
}
