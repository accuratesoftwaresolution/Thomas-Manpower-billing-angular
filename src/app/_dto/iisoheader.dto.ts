
import { IisodetailDto } from "./iisodetail.dto";
export class IisoheaderDto {
    coCode: string;

    dvCode: string;

    brCode: string;

    intCode: string;

    vrNo: number;

    vrDate: Date = new Date();

    refNo: string | null;

    refDate: Date | null = new Date();

    acCode: string | null;

    acName: string | null;

    salesman: string | null;

    contact: string | null;

    tel: string | null;

    fax: string | null;

    gsm: string | null;

    email: string | null;

    add1: string | null;

    add2: string | null;

    add3: string | null;

    add4: string | null;

    creditPeriod: number | null;

    paymentTerms: string | null;

    shippingTerms: string | null;

    edd: Date | null;

    discPer: number = 0;

    discAmt: number | null = 0;

    remarks: string | null;

    modeOfShip: string | null;

    deliveryTerms: string | null;

    curCode: string | null;

    curRate: number | null;

    status: string = "A";

    sysuser: string;

    sysdate: Date;

    modiuser: string | null;

    modidate: Date | null;

    verified: string | null;

    verifieddate: Date | null;

    verifieduser: string | null;

    void: string = 'N';

    voiddate: Date | null;

    voiduser: string | null;

    discType: string | null;

    sign1Name: string | null;

    sign1Desi: string | null;

    sign2Name: string | null;

    sign2Desi: string | null;

    sign3Name: string | null;

    sign3Desi: string | null;

    jobCode: string | null;

    lpoNo: string | null;

    lpoDate: Date | null;

    vat: string | null = 'N';

    vatPer: number | null;

    vatAmt: number | null;

    iisodetail?: IisodetailDto[]
}